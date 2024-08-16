export type Pa5sW0rdOptions = {
  length?: number;
  uppercase?: number | Pa5sW0rdRange;
  digits?: number | Pa5sW0rdRange;
  symbols?: number | Pa5sW0rdRange;
  exclude?: string;
};

export type NormolizedPa5sW0rdOptions = {
  length: number;
  uppercase: Pa5sW0rdRange;
  digits: Pa5sW0rdRange;
  symbols: Pa5sW0rdRange;
  exclude: string;
};

export type Pa5sW0rdRange = [min: number, max?: number];

export type Pa5sW0rdPassphraseOptions = {
  dictionary: string[];
  size?: number;
  separators?: string | string[];
  capitalize?: boolean;
  capitalizeEachWord?: boolean;
};
