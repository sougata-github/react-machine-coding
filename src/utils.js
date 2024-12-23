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
  if (lastDotIndex === -1 || lastDotIndex === trimmedName.length - 1) {
    return false;
  }

  return validNamePattern.test(trimmedName);
}

//password checker
export function hasMinimumLength(password) {
  return password.length >= 8;
}

export function hasNumbers(password) {
  return /\d/.test(password);
}

export function hasSpecialCharacters(password) {
  return /[!@#%^&*(),.?":{}|<>]/.test(password);
}

export function hasMixedCase(password) {
  return /[a-z]/.test(password) && /[A-Z]/.test(password);
}

export function evaluatePasswordStrength(password) {
  if (password.trim() === "") return "";

  const checks = [
    hasMinimumLength(password),
    hasNumbers(password),
    hasSpecialCharacters(password),
    hasMixedCase(password),
  ];

  const passedChecks = checks.filter(Boolean).length;

  if (passedChecks <= 1) return "weak";
  if (passedChecks <= 3) return "medium";
  return "strong";
}

export function getStrengthPercentage(strength) {
  const percentages = {
    weak: "33%",
    medium: "66%",
    strong: "100%",
  };

  return percentages[strength];
}
