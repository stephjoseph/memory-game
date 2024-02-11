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
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateNumberOfPlayers(parseInt(e.target.value));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTheme(e.target.value);
  };

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateGridSize(parseInt(e.target.value));
  };

  const startGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Redirect to the "/game" route
    navigate("/game");
  };

  return (
    <div className="flex h-screen w-full flex-col items-center gap-11 bg-midnight-blue px-6 py-20">
      <div>
        <h1 className="text-[2rem] font-bold lowercase leading-10 tracking-normal text-snow-white">
          memory
        </h1>
      </div>
      <form className="flex w-full max-w-[327px] flex-col gap-8 rounded-[10px] bg-snow-white p-6 ">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-[0.938rem] font-bold leading-[1.188rem] tracking-normal text-steel-blue">
              Select Theme
            </h2>
            <div className="flex w-full items-center gap-3">
              <label className="flex-1 cursor-pointer rounded-[26px] bg-light-steel-blue py-[0.625rem] text-center text-base font-bold leading-5 tracking-normal text-snow-white transition-colors duration-300 has-[:checked]:bg-dark-slate-blue">
                <input
                  type="radio"
                  name="theme"
                  value="numbers"
                  checked={theme === "numbers"}
                  onChange={handleThemeChange}
                  className="hidden h-0 w-0"
                />
                <span>Numbers</span>
              </label>
              <label className="flex-1 cursor-pointer rounded-[26px] bg-light-steel-blue py-[0.625rem] text-center text-base font-bold leading-5 tracking-normal text-snow-white transition-colors duration-300 has-[:checked]:bg-dark-slate-blue">
                <input
                  type="radio"
                  name="theme"
                  value="icons"
                  checked={theme === "icons"}
                  onChange={handleThemeChange}
                  className="hidden h-0 w-0"
                />
                <span>Icons</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-[0.938rem] font-bold leading-[1.188rem] tracking-normal text-steel-blue">
              Number of Players
            </h2>
            <div className="flex w-full items-center gap-3">
              <label className="flex-1 cursor-pointer rounded-[26px] bg-light-steel-blue py-[0.625rem] text-center text-base font-bold leading-5 tracking-normal text-snow-white transition-colors duration-300 has-[:checked]:bg-dark-slate-blue">
                <input
                  type="radio"
                  name="numberOfPlayers"
                  value={1}
                  checked={numberOfPlayers === 1}
                  onChange={handleNumberOfPlayersChange}
                  className="hidden h-0 w-0"
                />
                <span>1</span>
              </label>
              <label className="flex-1 cursor-pointer rounded-[26px] bg-light-steel-blue py-[0.625rem] text-center text-base font-bold leading-5 tracking-normal text-snow-white transition-colors duration-300 has-[:checked]:bg-dark-slate-blue">
                <input
                  type="radio"
                  name="numberOfPlayers"
                  value={2}
                  checked={numberOfPlayers === 2}
                  onChange={handleNumberOfPlayersChange}
                  className="hidden h-0 w-0"
                />
                <span>2</span>
              </label>
              <label className="flex-1 cursor-pointer rounded-[26px] bg-light-steel-blue py-[0.625rem] text-center text-base font-bold leading-5 tracking-normal text-snow-white transition-colors duration-300 has-[:checked]:bg-dark-slate-blue">
                <input
                  type="radio"
                  name="numberOfPlayers"
                  value={3}
                  checked={numberOfPlayers === 3}
                  onChange={handleNumberOfPlayersChange}
                  className="hidden h-0 w-0"
                />
                <span>3</span>
              </label>
              <label className="flex-1 cursor-pointer rounded-[26px] bg-light-steel-blue py-[0.625rem] text-center text-base font-bold leading-5 tracking-normal text-snow-white transition-colors duration-300 has-[:checked]:bg-dark-slate-blue">
                <input
                  type="radio"
                  name="numberOfPlayers"
                  value={4}
                  checked={numberOfPlayers === 4}
                  onChange={handleNumberOfPlayersChange}
                  className="hidden h-0 w-0"
                />
                <span>4</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-[0.938rem] font-bold leading-[1.188rem] tracking-normal text-steel-blue">
              Gride Size
            </h2>
            <div className="flex w-full items-center gap-3">
              <label className="flex-1 cursor-pointer rounded-[26px] bg-light-steel-blue py-[0.625rem] text-center text-base font-bold leading-5 tracking-normal text-snow-white transition-colors duration-300 has-[:checked]:bg-dark-slate-blue">
                <input
                  type="radio"
                  name="gridSize"
                  value={4}
                  checked={gridSize === 4}
                  onChange={handleGridSizeChange}
                  className="hidden h-0 w-0"
                />
                <span>4x4</span>
              </label>
              <label className="flex-1 cursor-pointer rounded-[26px] bg-light-steel-blue py-[0.625rem] text-center text-base font-bold leading-5 tracking-normal text-snow-white transition-colors duration-300 has-[:checked]:bg-dark-slate-blue">
                <input
                  type="radio"
                  name="gridSize"
                  value={6}
                  checked={gridSize === 6}
                  onChange={handleGridSizeChange}
                  className="hidden h-0 w-0"
                />
                <span>6x6</span>
              </label>
            </div>
          </div>
        </div>

        <button
          className="w-full rounded-[26px] bg-orange-yellow py-3 text-lg font-bold leading-[1.375rem] tracking-normal text-white"
          onClick={startGame}
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default Home;
