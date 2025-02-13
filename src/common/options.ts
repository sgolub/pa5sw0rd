export type PasswordOptions = {
  length?: number;
  uppercase?: number | Range;
  digits?: number | Range;
  symbols?: number | Range;
  exclude?: string;
};

export type NormolizedPasswordOptions = {
  length: number;
  uppercase: Range;
  digits: Range;
  symbols: Range;
  exclude: string;
};

export type Range = [min: number, max?: number];

export type PassphraseOptions = {
  dictionary?: string[];
  size?: number;
  separators?: string | string[];
  capitalize?: boolean;
  capitalizeEachWord?: boolean;
};
