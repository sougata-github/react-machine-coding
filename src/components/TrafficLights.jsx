import { lightConfig } from "../data";
import { useEffect, useRef, useState } from "react";

const TrafficLights = () => {
  const [activeLight, setActiveLight] = useState("red");
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveLight(lightConfig[activeLight].nextLight);
    }, lightConfig[activeLight].duration);

    return () => clearTimeout(timeoutRef.current);
  }, [activeLight]);

  return (
    <div className="p-4 h-fit w-[60px] flex flex-col gap-4 bg-black rounded-full items-center">
      {Object.keys(lightConfig).map((light) => (
        <div key={light}>
          <div
            className="rounded-full h-10 w-10 bg-transparent border-[#cecece] border-[2px] cursor-pointer transition-all duration-500"
            style={{
              backgroundColor: `${
                light === activeLight ? lightConfig[light].color : "transparent"
              }`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default TrafficLights;
