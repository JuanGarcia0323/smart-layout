import { direction } from './Reusable';

type stylesForDirection = {
  [key in direction]: string;
};

interface IPropsBorderSelector {
  position: direction;
  action: () => void;
  className?: string;
}

export type { IPropsBorderSelector, stylesForDirection };
