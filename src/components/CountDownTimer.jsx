/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

const CountDownTimer = () => {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [timerState, setTimerState] = useState("Start");
  const [buttonText, setButtonText] = useState("Start");

  const timerRef = useRef(null);
  const totalTimeInSecondsRef = useRef(0);

  const handleChange = (value, name) => {
    if (value.trim() === "" || /[^0-9]/.test(value)) {
      setTime((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    setTime((prev) => ({ ...prev, [name]: value }));
  };

  const convertToTotalSeconds = () => {
    const hoursInSeconds = parseInt(time.hours, 10) * 3600 || 0;
    const minutesInSeconds = parseInt(time.minutes, 10) * 60 || 0;
    const seconds = parseInt(time.seconds, 10) || 0;
    return hoursInSeconds + minutesInSeconds + seconds;
  };

  const updateDisplayTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setTime({
      hours: String(hours).padStart(2, "0") || "00",
      minutes: String(minutes).padStart(2, "0") || "00",
      seconds: String(seconds).padStart(2, "0") || "00",
    });
  };

  const startTimer = () => {
    totalTimeInSecondsRef.current = convertToTotalSeconds();

    timerRef.current = setInterval(() => {
      if (totalTimeInSecondsRef.current > 0) {
        totalTimeInSecondsRef.current -= 1;
        updateDisplayTime(totalTimeInSecondsRef.current);
      } else {
        clearInterval(timerRef.current);
        setTimerState("Start");
        setButtonText("Start");
      }
    }, 1000);
  };

  useEffect(() => {
    if (timerState === "Start") {
      clearInterval(timerRef.current);
    } else if (timerState === "Running") {
      startTimer();
    }

    return () => clearInterval(timerRef.current);
  }, [timerState]);

  const handleButtonClick = () => {
    if (timerState === "Start") {
      totalTimeInSecondsRef.current = convertToTotalSeconds();
      if (
        totalTimeInSecondsRef.current === 0 ||
        totalTimeInSecondsRef.current === null
      )
        return;

      setTimerState("Running");
      setButtonText("Pause");
    } else if (timerState === "Running") {
      setTimerState("Paused");
      setButtonText("Continue");
      clearInterval(timerRef.current);
    } else if (timerState === "Paused") {
      setTimerState("Running");
      setButtonText("Pause");
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setTime({
      hours: "00",
      minutes: "00",
      seconds: "00",
    });
    setTimerState("Start");
    setButtonText("Start");
  };

  const handleEditBlur = () => {
    setIsEditing(false);
  };

  const handleDivClick = () => {
    if (timerState !== "Start") {
      setTimerState("Paused");
      setButtonText("Continue");
    }
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-center">Timer</h1>

      <div className="mt-4 flex gap-4 text-lg items-center">
        <div className="text-center mt-2 flex flex-col gap-1 items-center">
          <p>Hours</p>
          {isEditing ? (
            <input
              value={time.hours}
              onChange={(e) => handleChange(e.target.value, "hours")}
              onBlur={handleEditBlur}
              type="text"
              className="w-12 h-12 rounded-lg text-lg text-center font-bold border border-black/10 focus:outline-none"
              maxLength={2}
            />
          ) : (
            <div
              className="h-12 w-12 rounded-lg text-lg font-bold border border-black/10 flex items-center justify-center focus:outline-none"
              onClick={handleDivClick}
            >
              {time.hours}
            </div>
          )}
        </div>
        <span className="mt-8">:</span>
        <div className="text-center mt-2 flex flex-col gap-1 items-center">
          <p>Minutes</p>
          {isEditing ? (
            <input
              value={time.minutes}
              onChange={(e) => handleChange(e.target.value, "minutes")}
              onBlur={handleEditBlur}
              type="text"
              className="w-12 h-12 rounded-lg text-lg text-center font-bold border border-black/10 focus:outline-none"
              maxLength={2}
            />
          ) : (
            <div
              className="h-12 w-12 rounded-lg text-lg font-bold border border-black/10 flex items-center justify-center"
              onClick={handleDivClick}
            >
              {time.minutes}
            </div>
          )}
        </div>
        <span className="mt-8">:</span>
        <div className="text-center mt-2 flex flex-col gap-1 items-center">
          <p>Seconds</p>
          {isEditing ? (
            <input
              value={time.seconds}
              onChange={(e) => handleChange(e.target.value, "seconds")}
              onBlur={handleEditBlur}
              type="text"
              className="w-12 h-12 rounded-lg text-lg text-center font-bold border border-black/10 focus:outline"
              maxLength={2}
            />
          ) : (
            <div
              className="h-12 w-12 rounded-lg text-lg font-bold border border-black/10 flex items-center justify-center"
              onClick={handleDivClick}
            >
              {time.seconds}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex gap-2 p-2 items-center justify-center w-full">
        <button
          onClick={handleButtonClick}
          className="py-2 px-4 bg-red-200 rounded-lg"
        >
          {buttonText}
        </button>
        <button
          onClick={handleReset}
          className="py-2 px-4 bg-yellow-200 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountDownTimer;
