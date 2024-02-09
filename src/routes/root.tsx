import { Outlet } from "react-router-dom";
import { GameSettingsProvider } from "../context/GameSettingsContext";

const Root = () => {
  return (
    <>
      <GameSettingsProvider>
        <Outlet />
      </GameSettingsProvider>
    </>
  );
};

export default Root;
