// useGameSettings.ts
import { useContext } from "react";
import {
  GameSettingsContextType,
  GameSettingsContext,
} from "../context/GameSettingsContext";

export const useGameSettings = (): GameSettingsContextType =>
  useContext(GameSettingsContext);
