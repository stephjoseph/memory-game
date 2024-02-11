import React, { useState, useEffect } from "react";
import { useGameSettings } from "../../hooks/useGameSettings";

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

  // Generate random tiles based on grid size and theme
  useEffect(() => {
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

    generateTiles();
  }, [gridSize, theme]);

  // Handle tile click
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
        // Reset flipped tiles and justMatchedTiles after a match
        setTimeout(() => {
          setFlippedTiles([]);
          setJustMatchedTiles([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setFlippedTiles([]);
          setTurn((turn + 1) % numberOfPlayers);
          setMoves((m) => m + 1);
        }, 1000); // Reset flippedTiles and change turn after 1 second
      }
    }
  };

  useEffect(() => {
    if (numberOfPlayers === 1) {
      if (matchedTiles.length === gridSize * gridSize) {
        // Game over for solo play
        // Calculate elapsed time
        const endTime = new Date().getTime();
        const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
        setElapsedTime(totalTimeInSeconds);
      } else if (matchedTiles.length === 0) {
        // Start tracking time when the first move is made
        setStartTime(new Date().getTime());
      }
    }
  }, [matchedTiles, gridSize, numberOfPlayers, startTime]);

  return (
    <div>
      <div>
        {numberOfPlayers === 1 ? (
          <>
            <div>Moves: {moves}</div>
            {startTime > 0 && <div>Time: {elapsedTime} seconds</div>}
          </>
        ) : (
          <>
            <div>Turn: Player {turn + 1}</div>
            <div>
              Scores:{" "}
              {scores
                .map((score, index) => `Player ${index + 1}: ${score}`)
                .join(", ")}
            </div>
          </>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 100px)`,
          gap: "5px",
        }}
      >
        {tiles.map((tile, index) => (
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: justMatchedTiles.includes(index)
                ? "goldenrod"
                : flippedTiles.includes(index) || matchedTiles.includes(index)
                  ? "lightblue"
                  : "gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => handleTileClick(index)}
          >
            {flippedTiles.includes(index) || matchedTiles.includes(index)
              ? tile
              : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
