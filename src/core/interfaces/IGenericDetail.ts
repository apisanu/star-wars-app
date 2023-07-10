export interface IGenericDetail {
  type: string;
  title: string;
  leftHand: LeftHand[];
  rightHand: RightHand[];
}

export interface LeftHand {
  key: string;
  value: string;
}

export interface RightHand {
  key: string;
  values: string[];
}

export interface IGenericDetailElement {
  type: string;
  data: any;
}
