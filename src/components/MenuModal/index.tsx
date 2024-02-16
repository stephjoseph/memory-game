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
      className={`fixed bottom-0 left-0 right-0 top-0 flex h-screen w-full min-w-[327px] items-center justify-center bg-black/50 px-6 transition-opacity duration-300 md:hidden ${
        showMenuModal
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex w-full max-w-[327px] flex-col gap-4 rounded-[10px] bg-snow-white p-6">
        <button
          className="w-full rounded-[26px] bg-orange-yellow py-3 text-center text-lg font-bold leading-[1.375rem] tracking-normal text-snow-white transition-colors duration-300 hover:bg-[#FFB84A] active:bg-[#FFB84A]"
          onClick={() => restartGame()}
        >
          Restart
        </button>
        <Link
          className="w-full rounded-[26px] bg-[#DFE7EC] py-3 text-center text-lg font-bold leading-[1.375rem] tracking-normal text-dark-slate-blue transition-colors duration-300 hover:bg-sky-blue hover:text-snow-white active:bg-sky-blue active:text-snow-white"
          to="/"
        >
          New Game
        </Link>
        <button
          className="w-full rounded-[26px] bg-[#DFE7EC] py-3 text-center text-lg font-bold leading-[1.375rem] tracking-normal text-dark-slate-blue transition-colors duration-300 hover:bg-sky-blue hover:text-snow-white active:bg-sky-blue active:text-snow-white"
          onClick={() => toggleMenu()}
        >
          Resume Game
        </button>
      </div>
    </div>
  );
};

export default MenuModal;
