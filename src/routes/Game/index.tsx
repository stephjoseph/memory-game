import React, { useState, useEffect } from "react";
import { useGameSettings } from "../../hooks/useGameSettings";
import GameOverModal from "../../components/GameOverModal";

const Game: React.FC = () => {
  const { numberOfPlayers, theme, gridSize } = useGameSettings();
  const [tiles, setTiles] = useState<(number | string)[]>([]);
  const [flippedTiles, setFlippedTiles] = useState<number[]>([]);
  const [matchedTiles, setMatchedTiles] = useState<number[]>([]);
  const [justMatchedTiles, setJustMatchedTiles] = useState<number[]>([]);
  const [turn, setTurn] = useState<number>(0);
  const [scores, setScores] = useState<number[]>(
    Array(numberOfPlayers).fill(0),
  );
  const [moves, setMoves] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [showGameOverModal, setShowGameOverModal] = useState<boolean>(false);

  const handleTileClick = (index: number) => {
    if (flippedTiles.length === 2 || matchedTiles.includes(index)) return;

    setFlippedTiles([...flippedTiles, index]);

    if (flippedTiles.length === 1) {
      if (tiles[flippedTiles[0]] === tiles[index]) {
        setMatchedTiles([...matchedTiles, flippedTiles[0], index]);
        setJustMatchedTiles([flippedTiles[0], index]);
        setScores((prevScores) => {
          const updatedScores = [...prevScores];
          updatedScores[turn] += 1;
          return updatedScores;
        });
        setMoves((m) => m + 1);
        setTimeout(() => {
          setFlippedTiles([]);
          setJustMatchedTiles([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setFlippedTiles([]);
          setTurn((turn + 1) % numberOfPlayers);
          setMoves((m) => m + 1);
        }, 1000);
      }
    }

    // Start tracking time when the user makes the first move
    if (startTime === 0) {
      setStartTime(new Date().getTime());
    }
  };

  const generateTiles = () => {
    const totalTiles = gridSize * gridSize;
    const tileValues =
      theme === "numbers"
        ? Array.from(Array(totalTiles / 2).keys())
        : ["A", "B", "C", "D", "E", "F", "G", "H"].slice(0, totalTiles / 2);
    const shuffledTiles = [...tileValues, ...tileValues].sort(
      () => Math.random() - 0.5,
    );
    setTiles(shuffledTiles);
  };

  const restartGame = () => {
    setTiles([]);
    setFlippedTiles([]);
    setMatchedTiles([]);
    setJustMatchedTiles([]);
    setScores(Array(numberOfPlayers).fill(0));
    setMoves(0);
    setStartTime(0);
    setElapsedTime(0);
    setShowGameOverModal(false);

    // retain turn if winner
    if (matchedTiles.length === gridSize * gridSize) {
      setTurn((prevTurn) => prevTurn);
    } else {
      setTurn(0);
    }

    // Generate new tiles
    generateTiles();
  };

  useEffect(() => {
    generateTiles();
  }, [gridSize, theme]);

  useEffect(() => {
    if (matchedTiles.length === gridSize * gridSize) {
      if (numberOfPlayers === 1) {
        const endTime = new Date().getTime();
        const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
        setElapsedTime(totalTimeInSeconds);
        setShowGameOverModal(true);
      } else {
        setShowGameOverModal(true);
      }
    }
  }, [matchedTiles, gridSize, numberOfPlayers, startTime]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (startTime !== 0 && elapsedTime < gridSize * gridSize) {
      timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsed = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [elapsedTime, startTime, gridSize]);

  const formatElapsedTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <div className="mx-auto flex w-full min-w-[375px] max-w-[375px] flex-col gap-20 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[1.5rem] font-bold lowercase leading-[1.875rem] tracking-normal text-midnight-blue">
            memory
          </h1>
          <button className="flex h-10 w-[4.875rem] items-center justify-center rounded-[26px] bg-orange-yellow text-center text-base font-bold leading-5 tracking-normal text-snow-white">
            Menu
          </button>
        </div>
        <div className="flex h-[500px] w-full min-w-[327px] flex-col justify-between">
          <div
            className={`${
              gridSize === 4
                ? "grid-cols-4 gap-3"
                : gridSize === 6
                  ? "grid-cols-6 gap-[0.563rem]"
                  : ""
            } grid`}
          >
            {tiles.map((tile, index) => (
              <div
                className={`flex cursor-pointer items-center justify-center rounded-full font-bold tracking-normal text-snow-white transition-colors duration-300 ${
                  justMatchedTiles.includes(index)
                    ? "bg-orange-yellow"
                    : flippedTiles.includes(index) ||
                        matchedTiles.includes(index)
                      ? "bg-light-steel-blue"
                      : "bg-dark-slate-blue"
                } ${
                  gridSize === 6
                    ? "h-[46.88px] w-[46.88px] text-[1.5rem] leading-[1.875rem]"
                    : gridSize === 4
                      ? "h-[72px] w-[72px] text-[2.5rem] leading-[3.125rem]"
                      : ""
                }`}
                onClick={() => handleTileClick(index)}
                key={index}
              >
                {flippedTiles.includes(index) || matchedTiles.includes(index)
                  ? tile
                  : ""}
              </div>
            ))}
          </div>
          <div className="flex gap-6">
            {numberOfPlayers === 1 ? (
              <>
                <div className="flex flex-1 flex-col items-center gap-[0.125rem] rounded-[5px] bg-light-steel-blue py-[0.625rem]">
                  <span className="text-[0.938rem] font-bold leading-[1.188rem] tracking-normal text-steel-blue">
                    Time
                  </span>
                  <span className="text-2xl font-bold leading-[1.875rem] tracking-normal text-dark-slate-blue">
                    {formatElapsedTime(elapsedTime)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-[0.125rem] rounded-[5px] bg-light-steel-blue py-[0.625rem]">
                  <span className="text-[0.938rem] font-bold leading-[1.188rem] tracking-normal text-steel-blue">
                    Moves
                  </span>
                  <span className="text-2xl font-bold leading-[1.875rem] tracking-normal text-dark-slate-blue">
                    {moves}
                  </span>
                </div>
              </>
            ) : (
              <>
                {scores.map((score, index) => (
                  <div
                    className={`relative flex flex-1 flex-col items-center gap-[0.125rem] rounded-[5px] py-[0.625rem] transition-colors duration-300 ${index + 1 === turn + 1 ? "bg-orange-yellow before:absolute before:-top-2 before:border-b-8 before:border-l-8 before:border-r-8 before:border-b-orange-yellow before:border-l-transparent before:border-r-transparent" : "bg-light-steel-blue"}`}
                    key={index}
                  >
                    <span
                      className={`text-[0.938rem] font-bold leading-[1.188rem] tracking-normal ${index + 1 === turn + 1 ? "text-snow-white" : "text-steel-blue"}`}
                    >
                      P{index + 1}
                    </span>
                    <span
                      className={`text-2xl font-bold leading-[1.875rem] tracking-normal  ${index + 1 === turn + 1 ? "text-snow-white" : "text-dark-slate-blue"}`}
                    >
                      {score}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Game Over Modal */}
      <GameOverModal
        numberOfPlayers={numberOfPlayers}
        elapsedTime={formatElapsedTime(elapsedTime)}
        scores={scores}
        moves={moves}
        restartGame={restartGame}
        showGameOverModal={showGameOverModal}
      />
    </>
  );
};

export default Game;
