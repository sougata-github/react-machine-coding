import { chartsData } from "../data";

import { motion } from "framer-motion";

const Chart = () => {
  return (
    <div className="h-[400px] w-fit p-4 cursor-pointer">
      <div className="relative h-full w-full border-b-black border-l-black border-2 border-t-0 border-r-0">
        <div className="h-full w-full flex gap-4 items-end mx-2">
          {chartsData.map((data) => (
            <motion.div
              className="relative w-[78px] bg-orange-500 rounded-t-lg group"
              key={data.id}
              style={{
                backgroundColor: `${data.color}`,
              }}
              initial={{
                height: 0,
              }}
              animate={{
                height: `${data.profit}%`,
              }}
              transition={{
                ease: "easeIn",
                duration: 0.8,
              }}
            >
              <div className="absolute opacity-0 rounded-sm text-xs font-medium text-center -top-8 right-0 left-0 group-hover:opacity-100 transition-all duration-500 z-40 truncate">
                {data.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* labels */}
        <div className="absolute font-medium text-sm bottom-[50%] -left-8 -rotate-[90deg]">
          Profit
        </div>
        <div className="absolute font-medium text-sm left-[calc(50%-16px)] -bottom-6">
          Departments
        </div>
      </div>
    </div>
  );
};

export default Chart;
