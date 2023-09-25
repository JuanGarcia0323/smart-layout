import { CSSProperties } from "react";
import { direction } from ".";

type stylesForDirection = {
  [key in direction]: string;
};

interface IPropsBorderSelector {
  position: direction;
  action: () => void;
  className?: string;
  customStyle?: CSSProperties;
}

export type { IPropsBorderSelector, stylesForDirection };
