import { posibleMovement } from ".";
import { IElementContainer } from "./ElementContainer";

interface position {
  depth: number;
  elementIndex: number;
}

interface layoutElement {
  key: string;
  id: number;
  parentId: number;
  orientation: orientation;
  className?: string;
  // content?: ReactNode;
  contrastMenuBar?: boolean;
}

interface IPropsGridLayout {
  elements: IElementContainer[];
  layout: dynamicLayout;
  setLayout: (layout: dynamicLayout) => void;
  startLayout: () => void;
  layoutId: string;
  limitMovement?: posibleMovement;
  hideMenubar?: boolean;
  lastCustomLayout?: string;
}

type positionLayout = Array<position>;
type orientation = "vertical" | "horizontal";
type dynamicLayout = Array<layoutElement>;
type direction = "right" | "left" | "bottom" | "top";

export type {
  position,
  layoutElement,
  IPropsGridLayout,
  positionLayout,
  orientation,
  dynamicLayout,
  direction,
};
