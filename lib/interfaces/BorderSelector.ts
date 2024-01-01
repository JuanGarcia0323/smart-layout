import { CSSProperties } from "react";
import { positions } from ".";

type stylesForDirection = {
  [key in positions]: string;
};

interface IPropsBorderSelector {
  position: positions;
  action: () => void;
  className?: string;
  customStyle?: CSSProperties;
}

export type { IPropsBorderSelector, stylesForDirection };
