export const regex = /^[가-힣a-zA-Z0-9]*$/;

export const isSpecialCharacters = (str: string) => {
  return !regex.test(str);
};
