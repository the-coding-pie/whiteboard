import React, { createContext, useState } from "react";
import { COLORS } from "../shared/constants";

interface Props {
  children: JSX.Element;
}

interface ColorContextInteface {
  currentColor: string;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
}

export const ColorContext = createContext<ColorContextInteface | null>(null);

const ColorContextProvider = ({ children }: Props) => {
  const [currentColor, setCurrentColor] = useState<string>(COLORS[0]);

  return (
    <ColorContext.Provider
      value={{
        currentColor,
        setCurrentColor,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContextProvider;
