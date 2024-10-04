export const transformData = (data, key = null, defaultValue = []) => {
  if (!data) return defaultValue;

  if (key && data[key]) {
    return data[key];
  }

  const foundKey = Object.keys(data).find((k) => Array.isArray(data[k]));

  return foundKey ? data[foundKey] : defaultValue;
};
