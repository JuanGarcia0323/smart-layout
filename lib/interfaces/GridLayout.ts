import { childrenLayout, customLayout, posibleMovement } from ".";

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
  contrastMenuBar?: boolean;
}

interface IPropsGridLayout {
  children: childrenLayout;
  layoutID: string;
  customLayout?: customLayout;
  limitMovement?: posibleMovement;
  hideMenubar?: boolean;
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
