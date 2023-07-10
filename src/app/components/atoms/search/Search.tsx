import React, { useState } from "react";
import { TextField } from "@mui/material";
import { IGenericTile } from "../../../../core/interfaces/IGenericTile";
import styles from "./Search.module.scss";

interface Props {
  data: IGenericTile[];
  onSearchResult: (results: IGenericTile[]) => void;
}

const Search: React.FC<Props> = ({ data, onSearchResult }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: any) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value === '') {
      onSearchResult(data);
    } else {
      const results = data.filter((item) => {
        const sectionValues = item.section.map((value) =>
          value.toString().toLowerCase()
        );
        return sectionValues.includes(value.toLowerCase());
      });
      onSearchResult(results);
    }
  };

  return (
    <div className={styles.search}>
      <TextField
        label="Search"
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
