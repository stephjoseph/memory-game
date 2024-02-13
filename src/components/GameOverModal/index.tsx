import { Link } from "react-router-dom";

interface GameOverModalProps {
  numberOfPlayers: number;
  elapsedTime: string;
  scores: number[];
  moves: number;
  restartGame: () => void;
  showGameOverModal: boolean;
}

const GameOverModal = ({
  numberOfPlayers,
  elapsedTime,
  scores,
  moves,
  restartGame,
  showGameOverModal,
}: GameOverModalProps) => {
  const winners: number[] = scores.reduce((acc: number[], score, index) => {
    if (score === Math.max(...scores)) {
      acc.push(index + 1); // Adding 1 to index since players are indexed from 1
    }
    return acc;
  }, []);

  const sortedPlayers = scores.map((score, index) => ({
    index: index + 1,
    score,
  }));
  sortedPlayers.sort((a, b) => {
    // Check if one of the players is a winner
    const aIsWinner = winners.includes(a.index);
    const bIsWinner = winners.includes(b.index);

    // If one player is a winner and the other is not, prioritize the winner
    if (aIsWinner && !bIsWinner) {
      return -1;
    } else if (!aIsWinner && bIsWinner) {
      return 1;
    } else {
      // If both players are winners or both are not winners, sort by score
      return b.score - a.score;
    }
  });
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 flex h-screen w-full min-w-[327px] items-center bg-black/50 px-6 transition-opacity duration-300 ${showGameOverModal ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="mx-auto flex w-full max-w-[327px] flex-col gap-6 rounded-[10px] bg-snow-white px-6 pb-6 pt-8">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col items-center gap-[0.563rem]">
            <h2 className="text-2xl font-bold leading-[1.875rem] tracking-normal text-midnight-blue">
              {numberOfPlayers === 1
                ? "You did it!"
                : winners.length === 1
                  ? `Player ${winners[0]} wins!`
                  : "It's a tie!"}
            </h2>
            <p className="text-[0.875rem] font-bold leading-[1.063rem] tracking-normal text-steel-blue">
              Game over!{" "}
              {numberOfPlayers === 1
                ? "Here’s how you got on…"
                : "Here are the results…"}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2">
            {numberOfPlayers === 1 ? (
              <>
                <div className="flex items-center justify-between rounded-[5px] bg-[#DFE7EC] px-4 py-3">
                  <span className="text-[0.813rem] font-bold leading-4 tracking-normal text-steel-blue">
                    Time Elapsed
                  </span>
                  <span className="text-darks-slate-blue text-xl font-bold leading-[1.563rem] tracking-normal">
                    {elapsedTime}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-[5px] bg-[#DFE7EC] px-4 py-3">
                  <span className="text-[0.813rem] font-bold leading-4 tracking-normal text-steel-blue">
                    Moves Taken
                  </span>
                  <span className="text-darks-slate-blue text-xl font-bold leading-[1.563rem] tracking-normal">
                    {moves}
                  </span>
                </div>
              </>
            ) : (
              <>
                {sortedPlayers.map((player) => (
                  <div
                    className={`flex items-center justify-between rounded-[5px] px-4 py-3 ${winners.includes(player.index) ? "bg-midnight-blue text-snow-white" : "bg-[#DFE7EC] text-steel-blue"}`}
                    key={player.index}
                  >
                    <span className="text-[0.813rem] font-bold leading-4 tracking-normal">
                      Player {player.index}
                    </span>
                    <span className="text-xl font-bold leading-[1.563rem] tracking-normal">
                      {player.score}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <button
            className="w-full rounded-[26px] bg-orange-yellow py-3 text-center text-lg font-bold leading-[1.375rem] tracking-normal text-snow-white"
            onClick={() => restartGame()}
          >
            Restart
          </button>
          <Link
            className="w-full rounded-[26px] bg-[#DFE7EC] py-3 text-center text-lg font-bold leading-[1.375rem] tracking-normal text-dark-slate-blue"
            to="/"
          >
            Setup New Game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
