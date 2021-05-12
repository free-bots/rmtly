export const toJson = (value: any): string => {
  try {
    return JSON.stringify(value);
  } catch (e) {
    console.error(e);
  }
  return '';
};

export const toObject = <T>(json: string): T | null => {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    console.error(e);
  }
  return null;
};
