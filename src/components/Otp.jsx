import { useState, useEffect, useRef } from "react";

const digits = 4;

const Otp = () => {
  const [otp, setOtp] = useState(new Array(digits).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  function handleChange(digit, index) {
    if (/[^0-9]/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    //move focus to next input
    if (digit && index < digits - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otp[index]) {
      //move focus to previous input
      if (index > 0) {
        inputRefs.current[index - 1].focus();
        inputRefs.current[index - 1].setSelectionRange(0, 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < digits - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-medium text-lg text-center">
        Enter OTP sent to your device
      </h1>

      <div className="flex gap-2 mt-6 items-center justify-center">
        {Array.from({ length: digits }).map((_, index) => (
          <input
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={otp[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="bg-gray-100 w-12 h-12 rounded-lg focus:outline-gray-700 text-lg text-center text-gray-600 font-bold disabled:bg-gray-100"
            key={index}
            maxLength={1}
          />
        ))}
      </div>
    </div>
  );
};

export default Otp;
