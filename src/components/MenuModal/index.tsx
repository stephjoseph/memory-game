import { Link } from "react-router-dom";

interface MenuModalProps {
  showMenuModal: boolean;
  toggleMenu: () => void;
  restartGame: () => void;
}

const MenuModal = ({
  showMenuModal,
  toggleMenu,
  restartGame,
}: MenuModalProps) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 flex h-screen w-full min-w-[327px] items-center bg-black/50 px-6 transition-opacity duration-300 ${
        showMenuModal
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex w-full flex-col gap-4 rounded-[10px] bg-snow-white p-6">
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
          New Game
        </Link>
        <button
          className="w-full rounded-[26px] bg-[#DFE7EC] py-3 text-center text-lg font-bold leading-[1.375rem] tracking-normal text-dark-slate-blue"
          onClick={() => toggleMenu()}
        >
          Resume Game
        </button>
      </div>
    </div>
  );
};

export default MenuModal;
