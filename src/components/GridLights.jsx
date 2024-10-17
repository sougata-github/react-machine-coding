import { useEffect, useRef, useState } from "react";

const TOTAL_LIGHTS = 9;

const GridLights = () => {
  const buttonRefs = useRef([]);
  const timeoutRefs = useRef([]);
  const [active, setActive] = useState({});
  const [sequence, setSequence] = useState([]);

  const handleClick = (index) => {
    setSequence((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });

    setActive((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const disableLights = () => {
      //when sequence is full
      if (sequence.length === TOTAL_LIGHTS) {
        let delay = 0;

        setTimeout(() => {
          sequence
            .slice()
            .reverse()
            .forEach((index, i) => {
              timeoutRefs.current[i] = setTimeout(() => {
                setActive((prev) => ({
                  ...prev,
                  [index]: false,
                }));

                if (buttonRefs.current[index]) {
                  buttonRefs.current[index].disabled = true;
                }

                if (i === sequence.length - 1) {
                  setSequence([]);
                  buttonRefs.current.forEach((button) => {
                    if (button) button.disabled = false;
                  });
                }
              }, delay);
              delay += 500;
            });
        }, 500);
      }
    };

    disableLights();

    const currentTimeouts = timeoutRefs.current;

    return () => currentTimeouts.forEach((timeout) => clearTimeout(timeout));
  }, [sequence]);

  return (
    <div className="p-4 h-[400px] w-[400px] border border-black/20 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-8">
        {[...new Array(TOTAL_LIGHTS)].fill(0).map((_, index) => (
          <button
            ref={(el) => (buttonRefs.current[index] = el)}
            onClick={() => handleClick(index)}
            key={index}
            className="size-20 border border-black/40 cursor-pointer"
            style={{
              backgroundColor: `${active[index] ? "green" : "transparent"}`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GridLights;
