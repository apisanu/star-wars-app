import axios from 'axios';
import _ from 'lodash';
import { ResourcesType } from '../enum/Resource';
import { IFilm } from '../interfaces/IFilm';
import { IGenericDetailElement } from '../interfaces/IGenericDetail';
import { IPeople } from '../interfaces/IPeople';
import { IPlanet } from '../interfaces/IPlanet';
import { ISpecie } from '../interfaces/ISpecie';
import { IStarship } from '../interfaces/IStarship';
import { IVehicle } from '../interfaces/IVehicle';

async function request(url: string) {
  const headers = {
    accept: 'application/json',
  };

  const config = {
    headers: headers,
  };

  const response = await axios.get(url, config);
  const result = response.data;

  return result;
}

class Resource<S> {
  constructor(public value: S) {}

  public async populate(path: string) {
    await this.populateRec(path, this.value);

    return this;
  }

  private async populateSingle(path: string, obj: any) {
    if (Array.isArray(obj[path])) {
      obj[path] = await Promise.all(
        (obj[path] as string[]).map((url) =>
          request(url.replace('http', 'https'))
        )
      );

      return this;
    }

    obj[path] = await request((obj[path] as string).replace('http', 'https'));

    return this;
  }

  private populateRec(path: string, obj: any): Promise<{}> {
    const [next, ...rest] = path.split('.');

    if (rest.length > 0 && Array.isArray(obj[next])) {
      return Promise.all(
        obj[next].map((single: any) => this.populateRec(rest.join('.'), single))
      );
    }

    if (rest.length === 0 && Array.isArray(obj)) {
      return Promise.all(
        obj.map((single) => this.populateSingle(next, single))
      );
    } else if (rest.length === 0) {
      return this.populateSingle(next, obj);
    }

    return this.populateRec(rest.join('.'), obj[next] as {});
  }
}

function createCollection<T>(resource: ResourcesType) {
  return class ApiCollection {
    static root = `https://swapi.dev/api/${resource}/`;
    public resources: Resource<T>[] = [];

    constructor(unparsedResources: T[]) {
      this.resources = unparsedResources.map(
        (resource) => new Resource<T>(resource)
      );
    }

    async populateAll(path: string) {
      this.resources = await Promise.all(
        this.resources.map((obj) => obj.populate(path))
      );

      return this;
    }

    static getPage(page: number = 1, search?: string) {
      if (search) {
        return request(`${ApiCollection.root}?page=${page}&search=${search}`);
      }

      return request(`${ApiCollection.root}?page=${page}`);
    }

    public static async find(predicate?: (single: T) => boolean) {
      const { count, results: firstResult } = await ApiCollection.getPage();
      const pages = Math.ceil(count / firstResult.length);
      const left = Array.from(
        {
          length: pages - 1,
        },
        (_, i) => ApiCollection.getPage(2 + i)
      );
      const restResults = await Promise.all(left);

      const totalResults: T[] = [
        {
          results: firstResult,
        },
        ...restResults,
      ].reduce((allResults, { results }) => {
        return [...allResults, ...results];
      }, []);

      return new ApiCollection(_.filter(totalResults, predicate));
    }

    public static async findBySearch(predicate: string[]) {
      const pages = await Promise.all(
        predicate.map((query) => this.getPage(1, query))
      );

      return new ApiCollection(_.flatMap(pages, 'results'));
    }
  };
}

export const getOne = async (
  type: string | null,
  id: string | undefined
): Promise<IGenericDetailElement> => {
  const headers = {
    accept: 'application/json',
  };

  const config = {
    headers: headers,
  };

  //TODO Handle errors and "type = null" case
  const url = `https://swapi.dev/api/${type}/${id}`;

  const response = await axios.get(url, config);
  return {
    type: type ? type : '',
    data: response.data,
  };
};

export const Films = createCollection<IFilm>(ResourcesType.Films);
export const People = createCollection<IPeople>(ResourcesType.People);
export const Planets = createCollection<IPlanet>(ResourcesType.Planets);
export const Species = createCollection<ISpecie>(ResourcesType.Species);
export const Starships = createCollection<IStarship>(ResourcesType.Starships);
export const Vehicles = createCollection<IVehicle>(ResourcesType.Vehicles);
