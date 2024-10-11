export const transformData = (data, key = null, defaultValue = []) => {
  if (!data) return defaultValue;

  if (key && data[key]) {
    return data[key];
  }

  const foundKey = Object.keys(data).find((k) => Array.isArray(data[k]));

  return foundKey ? data[foundKey] : defaultValue;
};

export function isValidName(name, isFolder) {
  const validNamePattern = /^[a-zA-Z0-9._@-]+$/;

  const trimmedName = name.trim();

  if (isFolder) {
    return validNamePattern.test(trimmedName) && !trimmedName.endsWith(".");
  }

  const lastDotIndex = trimmedName.lastIndexOf(".");
  if (
    lastDotIndex === -1 ||
    lastDotIndex === 0 ||
    lastDotIndex === trimmedName.length - 1
  ) {
    return false;
  }

  return validNamePattern.test(trimmedName);
}
