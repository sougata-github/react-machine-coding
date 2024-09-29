import { useState, useEffect, useRef } from "react";

const ProgressBar = () => {
  const [translate, setTranslate] = useState(100);

  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      setTranslate((prev) => {
        if (prev <= 0) {
          clearInterval(interval.current);
          return 0;
        }

        return prev - 10;
      });
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  return (
    <div className="flex flex-col px-4 gap-4">
      <h1 className="text-slate-800 text-xl font-semibold text-center">
        Progress Bar
      </h1>
      <div className="relative max-sm:w-[320px] w-[400px] h-[20px] bg-pink-200 rounded-xl overflow-hidden">
        <div
          className={`absolute inset-0 bg-pink-500 rounded-xl transition-all duration-500`}
          style={{ transform: `translateX(-${translate}%)` }}
        />
      </div>

      <p className="text-slate-500 font-medium text-center text-sm">
        Progress: {translate === 100 ? "0%" : `${100 - translate}%`}
      </p>
    </div>
  );
};

export default ProgressBar;
