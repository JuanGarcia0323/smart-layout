import { direction, posibleMovement } from ".";
import { dynamicLayout, layoutElement } from "./GridLayout";

interface IPropsLayoutElement {
  element: layoutElement;
  layout: dynamicLayout;
  dragging?: layoutElement;
  moveELement?: (
    dragging: layoutElement,
    element: layoutElement,
    direction: direction
  ) => void;
  moveToTheTop?: (element: layoutElement) => void;
  onClickFullScreen?: () => void;
  onClickMove?: () => void;
  onClickClose?: () => void;
  cancelSelection?: () => void;
  childrens?: Array<JSX.Element>;
  fullScreen?: layoutElement;
  hideMenubar?: boolean;
  limitMovement?: posibleMovement;
}

export type { IPropsLayoutElement };
