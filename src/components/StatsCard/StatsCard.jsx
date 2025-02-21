// import React from "react";

const StatsCard = ({
  title,
  value,
  description,
  progress,
  maxValue,
  color,
}) => {
  const percentage = (progress / maxValue) * 100;

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-2 md:p-4 m-2 flex flex-col border-l-4"
      style={{ borderColor: color }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs md:text-base font-semibold text-gray-800">
          {title}
        </span>
        <span className="text-sm md:text-xl font-bold text-gray-700">
          {value}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full">
        <div
          className="h-2 md:h-3 rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
      <p className="text-xs md:text-sm text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default StatsCard;
