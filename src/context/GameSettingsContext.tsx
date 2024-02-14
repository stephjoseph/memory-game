import React, { createContext, useState } from "react";

export interface GameSettings {
  numberOfPlayers: number;
  theme: string;
  gridSize: number;
}

export interface GameSettingsContextType extends GameSettings {
  updateNumberOfPlayers: (players: number) => void;
  updateTheme: (theme: string) => void;
  updateGridSize: (size: number) => void;
}

export const GameSettingsContext = createContext<GameSettingsContextType>({
  numberOfPlayers: 1,
  theme: "numbers",
  gridSize: 4,
  updateNumberOfPlayers: () => {},
  updateTheme: () => {},
  updateGridSize: () => {},
});

interface GameSettingsProviderProps {
  children: React.ReactNode;
}

export const GameSettingsProvider: React.FC<GameSettingsProviderProps> = ({
  children,
}) => {
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(() => {
    const savedSettings = localStorage.getItem("gameSettings");
    if (savedSettings) {
      return JSON.parse(savedSettings).numberOfPlayers;
    }
    return 1; // Default value if not found in localStorage
  });

  const [theme, setTheme] = useState<string>(() => {
    const savedSettings = localStorage.getItem("gameSettings");
    if (savedSettings) {
      return JSON.parse(savedSettings).theme;
    }
    return "numbers"; // Default value if not found in localStorage
  });

  const [gridSize, setGridSize] = useState<number>(() => {
    const savedSettings = localStorage.getItem("gameSettings");
    if (savedSettings) {
      return JSON.parse(savedSettings).gridSize;
    }
    return 4; // Default value if not found in localStorage
  });

  const updateNumberOfPlayers = (players: number) => {
    setNumberOfPlayers(players);
    saveSettingsToLocalStorage({ numberOfPlayers: players, theme, gridSize });
  };

  const updateTheme = (selectedTheme: string) => {
    setTheme(selectedTheme);
    saveSettingsToLocalStorage({
      numberOfPlayers,
      theme: selectedTheme,
      gridSize,
    });
  };

  const updateGridSize = (size: number) => {
    setGridSize(size);
    saveSettingsToLocalStorage({ numberOfPlayers, theme, gridSize: size });
  };

  const saveSettingsToLocalStorage = (settings: GameSettings) => {
    localStorage.setItem("gameSettings", JSON.stringify(settings));
  };

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
