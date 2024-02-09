// Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameSettings } from "../../hooks/useGameSettings";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const {
    numberOfPlayers,
    theme,
    gridSize,
    updateNumberOfPlayers,
    updateTheme,
    updateGridSize,
  } = useGameSettings();

  const handleNumberOfPlayersChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    updateNumberOfPlayers(parseInt(e.target.value));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTheme(e.target.value);
  };

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateGridSize(parseInt(e.target.value));
  };

  const startGame = () => {
    // Redirect to the "/game" route
    navigate("/game");
  };

  return (
    <div>
      <h2>Start Game</h2>
      <div>
        <label>
          Number of Players:
          <select
            value={numberOfPlayers}
            onChange={handleNumberOfPlayersChange}
          >
            <option value={1}>Solo</option>
            <option value={2}>2 Players</option>
            <option value={3}>3 Players</option>
            <option value={4}>4 Players</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Theme:
          <select value={theme} onChange={handleThemeChange}>
            <option value="numbers">Numbers</option>
            <option value="icons">Icons</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Grid Size:
          <select value={gridSize} onChange={handleGridSizeChange}>
            <option value={4}>4x4</option>
            <option value={6}>6x6</option>
          </select>
        </label>
      </div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default Home;
