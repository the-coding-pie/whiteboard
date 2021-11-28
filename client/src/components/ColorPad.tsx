import React, { useContext } from "react";
import { ColorContext } from "../contexts/ColorContext";
import { COLORS } from "../shared/constants";

const ColorPad = () => {
  const { currentColor, setCurrentColor } = useContext(ColorContext)!;

  return (
    <div
      id="color-pad"
      className="color-pad bg-white flex flex-col items-center shadow-lg rounded fixed left-4"
    >
      {COLORS.map((color) => (
        <button
          key={color}
          aria-label={`click to choose this color(${color})`}
          className={`w-8 h-8 ${currentColor === color ? 'border-2 border-gray-500' : ''}`}
          style={{
            background: color,
          }}
          onClick={(e) => setCurrentColor(color)}
        ></button>
      ))}
    </div>
  );
};

export default ColorPad;
