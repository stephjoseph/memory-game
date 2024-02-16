import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGameSettings } from "../../hooks/useGameSettings";
import GameOverModal from "../../components/GameOverModal";
import MenuModal from "../../components/MenuModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnchor,
  faCar,
  faCat,
  faDog,
  faPlane,
  faShip,
  faHeart,
  faCoffee,
  faFish,
  faBolt,
  faDice,
  faGlobe,
  faLeaf,
  faSun,
  faMoon,
  faStar,
  faSmile,
  faTree,
  faAppleWhole,
  faBomb,
  faChessPawn,
  faGem,
  faHourglass,
  faIceCream,
  faKey,
  faLemon,
  faMusic,
  faPaw,
  faRocket,
  faUmbrella,
  faWheelchair,
  faYinYang,
} from "@fortawesome/free-solid-svg-icons";

const Game: React.FC = () => {
  const { numberOfPlayers, theme, gridSize } = useGameSettings();
  const [tiles, setTiles] = useState<(JSX.Element | number)[]>([]);
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
  const [showMenuModal, setShowMenuModal] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  // Font Awesome icons
  const icons = [
    faAnchor,
    faCar,
    faCat,
    faDog,
    faPlane,
    faShip,
    faHeart,
    faCoffee,
    faFish,
    faBolt,
    faDice,
    faGlobe,
    faLeaf,
    faSun,
    faMoon,
    faStar,
    faSmile,
    faTree,
    faAppleWhole,
    faBomb,
    faChessPawn,
    faGem,
    faHourglass,
    faIceCream,
    faKey,
    faLemon,
    faMusic,
    faPaw,
    faRocket,
    faUmbrella,
    faWheelchair,
    faYinYang,
  ];

  const handleTileClick = (index: number) => {
    // Ignore the click event if the clicked tile is already flipped
    if (flippedTiles.includes(index) || matchedTiles.includes(index)) return;

    if (flippedTiles.length === 2) return;

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
    const iconValues = icons
      .slice(0, totalTiles / 2)
      .map((icon, index) => <FontAwesomeIcon icon={icon} key={index} />);
    const numberValues = Array.from(Array(totalTiles / 2).keys());
    const values = theme === "numbers" ? numberValues : iconValues;
    const shuffledTiles = [...values, ...values].sort(
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
    setShowMenuModal(false);

    // retain turn if winner
    if (matchedTiles.length === gridSize * gridSize) {
      setTurn((prevTurn) => prevTurn);
    } else {
      setTurn(0);
    }

    document.body.classList.remove("overflow-y-hidden");

    // Generate new tiles
    generateTiles();
  };

  const toggleMenu = () => {
    setShowMenuModal((prevShowMenuModal) => !prevShowMenuModal);

    if (!showMenuModal) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
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

      document.body.classList.add("overflow-y-hidden");
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const formatElapsedTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <div
        className={`mx-auto flex min-h-[667px] w-full min-w-[375px] max-w-[375px] flex-col items-center justify-center gap-20 overflow-auto p-6 md:min-h-[1024px] md:min-w-[768px] md:max-w-[768px] md:px-10 md:py-9 xl:min-w-[1280px] xl:max-w-[1440px] xl:px-[10.313rem] xl:py-16  ${gridSize === 4 ? "md:gap-[9.813rem] xl:gap-28" : gridSize === 6 ? "md:gap-[7.5rem] xl:gap-24" : ""}`}
      >
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[1.5rem] font-bold lowercase leading-[1.875rem] tracking-normal text-midnight-blue md:text-[2.5rem] md:leading-[3.125rem]">
            memory
          </h1>
          <button
            className="flex h-10 w-[4.875rem] items-center justify-center rounded-[26px] bg-orange-yellow text-center text-base font-bold leading-5 tracking-normal text-snow-white md:hidden"
            onClick={toggleMenu}
          >
            Menu
          </button>
          <div className="hidden items-center gap-4 md:flex">
            <button
              className="flex h-[3.25rem] w-[7.938rem] items-center justify-center rounded-[26px] bg-orange-yellow text-center text-[1.25rem] font-bold leading-[1.563rem] tracking-normal text-snow-white transition-colors duration-300 hover:bg-[#FFB84A] active:bg-[#FFB84A]"
              onClick={() => restartGame()}
            >
              Restart
            </button>
            <Link
              to="/"
              className="flex h-[3.25rem] w-[9.313rem] items-center justify-center rounded-[26px] bg-[#DFE7EC] text-center text-[1.25rem] font-bold leading-[1.563rem] tracking-normal text-dark-slate-blue transition-colors duration-300 hover:bg-sky-blue hover:text-snow-white active:bg-sky-blue active:text-snow-white"
            >
              New Game
            </Link>
          </div>
        </div>
        <div
          className={`flex h-[500px] w-full min-w-[327px] flex-col items-center justify-between md:min-w-[689px] ${gridSize === 4 ? "md:h-[730px]" : gridSize === 6 ? "md:h-[776px] xl:h-[746px]" : ""}`}
        >
          <div
            className={`${
              gridSize === 4
                ? "grid-cols-4 gap-3 md:max-w-[532px] md:gap-5"
                : gridSize === 6
                  ? "grid-cols-6 gap-[0.563rem] md:max-w-[572px] md:gap-4"
                  : ""
            } grid`}
          >
            {tiles.map((tile, index) => (
              <button
                type="button"
                className={`flex cursor-pointer items-center justify-center rounded-full font-bold tracking-normal text-snow-white transition-colors duration-300 ${
                  justMatchedTiles.includes(index)
                    ? "bg-orange-yellow"
                    : flippedTiles.includes(index) ||
                        matchedTiles.includes(index)
                      ? "bg-light-steel-blue"
                      : "bg-dark-slate-blue hover:bg-sky-blue active:bg-sky-blue"
                } ${
                  gridSize === 4
                    ? "h-[72px] w-[72px] text-[2.5rem] leading-[3.125rem] md:h-[118px] md:w-[118px] md:text-[3.5rem] md:leading-[4.313rem]"
                    : gridSize === 6
                      ? "h-[46.88px] w-[46.88px] text-[1.5rem] leading-[1.875rem] md:h-[82px] md:w-[82px] md:text-[2.75rem] md:leading-[3.438rem]"
                      : ""
                }`}
                onClick={() => handleTileClick(index)}
                key={index}
              >
                {flippedTiles.includes(index) || matchedTiles.includes(index)
                  ? tile
                  : ""}
              </button>
            ))}
          </div>
          <div
            className={`flex w-full gap-6 ${numberOfPlayers === 1 ? "md:max-w-[540px]" : ""}`}
          >
            {numberOfPlayers === 1 ? (
              <>
                <div className="flex flex-1 flex-col items-center gap-[0.125rem] rounded-[5px] bg-[#DFE7EC] py-[0.625rem] md:flex-row md:justify-between md:rounded-[10px] md:px-6 md:py-4">
                  <span className="text-[0.938rem] font-bold leading-[1.188rem] tracking-normal text-steel-blue md:text-lg md:leading-[1.375rem]">
                    Time
                  </span>
                  <span className="text-2xl font-bold leading-[1.875rem] tracking-normal text-dark-slate-blue md:text-[2rem] md:leading-10">
                    {formatElapsedTime(elapsedTime)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-[0.125rem] rounded-[5px] bg-[#DFE7EC] py-[0.625rem] md:flex-row md:justify-between md:px-6 md:py-4">
                  <span className="text-[0.938rem] font-bold leading-[1.188rem] tracking-normal text-steel-blue md:text-lg md:leading-[1.375rem]">
                    Moves
                  </span>
                  <span className="text-2xl font-bold leading-[1.875rem] tracking-normal text-dark-slate-blue md:text-[2rem] md:leading-10">
                    {moves}
                  </span>
                </div>
              </>
            ) : (
              <>
                {scores.map((score, index) => (
                  <div className="relative flex flex-1 flex-col items-center">
                    <div
                      className={`flex w-full flex-col items-center gap-[0.125rem] rounded-[5px] py-[0.625rem] transition-colors duration-300 md:items-start md:gap-[0.313rem] md:rounded-[10px] md:px-4 md:py-3 xl:flex-row xl:items-center xl:justify-between xl:px-5 xl:py-4 ${index + 1 === turn + 1 ? "bg-orange-yellow before:absolute before:-top-2 before:border-b-8 before:border-l-8 before:border-r-8 before:border-b-orange-yellow before:border-l-transparent before:border-r-transparent md:before:-top-3 md:before:left-[calc(50%-6px)] md:before:border-b-[12px] md:before:border-l-[12px] md:before:border-r-[12px] xl:before:-top-5 xl:before:left-[calc(50%-10px)] xl:before:border-b-[20px] xl:before:border-l-[20px] xl:before:border-r-[20px]" : "bg-[#DFE7EC]"}`}
                      key={index}
                    >
                      <span
                        className={`text-[0.938rem] font-bold leading-[1.188rem] tracking-normal xl:text-lg xl:leading-[1.375rem] ${index + 1 === turn + 1 ? "text-snow-white" : "text-steel-blue"}`}
                      >
                        {windowWidth >= 768
                          ? `Player ${index + 1}`
                          : `P${index + 1}`}
                      </span>
                      <span
                        className={`text-2xl font-bold leading-[1.875rem] tracking-normal xl:text-[2rem] xl:leading-10 ${index + 1 === turn + 1 ? "text-snow-white" : "text-dark-slate-blue"}`}
                      >
                        {score}
                      </span>
                    </div>
                    {index + 1 === turn + 1 && (
                      <span className="absolute -bottom-8 hidden text-[0.813rem] font-bold uppercase leading-4 tracking-[5px] text-midnight-blue xl:block">
                        Current Turn
                      </span>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Menu Modal */}
      <MenuModal
        showMenuModal={showMenuModal}
        toggleMenu={toggleMenu}
        restartGame={restartGame}
      />

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
