/* eslint-disable react/prop-types */
import { Check, Circle } from "lucide-react";
import { useState } from "react";

import {
  evaluatePasswordStrength,
  getStrengthPercentage,
  hasMinimumLength,
  hasNumbers,
  hasSpecialCharacters,
  hasMixedCase,
} from "../../utils";

const Password = () => {
  const [password, setPassword] = useState("");

  //dervied state
  const strength = evaluatePasswordStrength(password);

  return (
    <div className="p-8 h-[400px]">
      <h1 className="mb-6 text-2xl font-bold">Password Strength Checker</h1>

      <div className="max-w-md">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-2"
          placeholder="Enter password"
        />
      </div>

      {password.trim() !== "" && (
        <p
          className={`${
            strength === "weak"
              ? "text-gray-500"
              : strength === "medium"
              ? "text-orange-500"
              : "text-green-500"
          } mt-2`}
        >
          {strength[0].toUpperCase() + strength.slice(1)}{" "}
          <span className="text-gray-500">password</span>
        </p>
      )}

      <StrengthIndicator strength={strength} />
      <RequirementsList password={password} />
    </div>
  );
};

export default Password;

const StrengthIndicator = ({ strength }) => {
  const colors = {
    weak: "bg-red-500",
    medium: "bg-yellow-500",
    strong: "bg-green-500",
  };

  return (
    <div className="mt-4">
      <div className="h-2 w-full rounded bg-gray-200">
        <div
          className={`h-full rounded transition-all duration-300 ${colors[strength]}`}
          style={{ width: getStrengthPercentage(strength) }}
        ></div>
      </div>
    </div>
  );
};

const RequirementsList = ({ password }) => {
  const requirements = [
    {
      label: "At least 8 characters",
      met: hasMinimumLength(password),
    },
    {
      label: "Contains numbers",
      met: hasNumbers(password),
    },
    {
      label: "Contains special characters",
      met: hasSpecialCharacters(password),
    },
    {
      label: "Contains uppercase & lowercase",
      met: hasMixedCase(password),
    },
  ];

  return (
    <div className="mt-4 flex flex-col gap-8">
      {requirements.map((requirement) => (
        <p
          key={requirement.label}
          className={`${
            requirement.met ? "text-green-500" : "text-gray-500"
          } inline-flex gap-1`}
        >
          <span>
            {requirement.met ? (
              <Check className="text-green-500" />
            ) : (
              <Circle className="text-gray-400" />
            )}
          </span>{" "}
          {requirement.label}.
        </p>
      ))}
    </div>
  );
};
