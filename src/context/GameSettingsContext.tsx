// GameSettingsContext.tsx
import React, { createContext, useState } from "react";

export interface GameSettingsContextType {
  numberOfPlayers: number;
  theme: string;
  gridSize: number;
  updateNumberOfPlayers: (players: number) => void;
  updateTheme: (theme: string) => void;
  updateGridSize: (size: number) => void;
}

const defaultContext: GameSettingsContextType = {
  numberOfPlayers: 1,
  theme: "numbers",
  gridSize: 4,
  updateNumberOfPlayers: () => {},
  updateTheme: () => {},
  updateGridSize: () => {},
};

export const GameSettingsContext =
  createContext<GameSettingsContextType>(defaultContext);

interface GameSettingsProviderProps {
  children: React.ReactNode;
}

export const GameSettingsProvider: React.FC<GameSettingsProviderProps> = ({
  children,
}) => {
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(1);
  const [theme, setTheme] = useState<string>("numbers");
  const [gridSize, setGridSize] = useState<number>(4);

  const updateNumberOfPlayers = (players: number) =>
    setNumberOfPlayers(players);
  const updateTheme = (selectedTheme: string) => setTheme(selectedTheme);
  const updateGridSize = (size: number) => setGridSize(size);

  return (
    <GameSettingsContext.Provider
      value={{
        numberOfPlayers,
        theme,
        gridSize,
        updateNumberOfPlayers,
        updateTheme,
        updateGridSize,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};
