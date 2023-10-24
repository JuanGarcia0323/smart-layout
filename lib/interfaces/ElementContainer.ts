import { layoutElement } from "./GridLayout";
import { childrenLayout } from ".";

interface IElementContainer {
  id: string;
  key: string;
  element: childrenLayout;
  fullScreen?: layoutElement;
  dragging?: layoutElement;
  cancelSelection?: () => void;
  layoutId: string;
}

export type { IElementContainer };
