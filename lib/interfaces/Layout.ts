import { ReactNode } from "react";
import { IElementContainer, dynamicLayout, layoutElement, direction } from ".";

type posibleMovement = "horizontal" | "vertical";

type customLayout = {
  name: string;
  layout: dynamicLayout;
};

interface stateContext {
  layout: dynamicLayout;
  elements: IElementContainer[];
  dragging?: layoutElement;
  fullScreen?: layoutElement;
}

interface actionsContext {
  startLayout: (children: childrenLayout, id: string) => void;
  setLayout: (layout: dynamicLayout) => void;
  moveElement: (
    layout: dynamicLayout,
    element: layoutElement,
    elementToSwitch: layoutElement,
    directionInsert: direction
  ) => dynamicLayout;
  handleSwitch: (element: layoutElement) => void;
  handleMove: (
    dragging: layoutElement,
    element: layoutElement,
    directionInsert: direction
  ) => void;
  moveToTheTop: (element: layoutElement) => void;
  deleteFromLayout: (layout: dynamicLayout, element: layoutElement) => void;
  handleFullScreen: (element: layoutElement) => void;
  cancelSelection: () => void;
  saveLayout: (layout: dynamicLayout, layoutID: string) => void;
}

interface IContextStore {
  state?: stateContext;
  actions?: actionsContext;
}

interface ICustomComponentLayout {
  className: string;
  title: string;
  onFullScreen: () => void;
  onClose: () => void;
  onMove: () => void;
  onMoveToTheTop: () => void;
  content: ReactNode;
}

interface IPropsComponentLayout {
  children: childrenLayout;
  id: string;
  hideMenuBar?: boolean;
  limitMovement?: posibleMovement;
  customLayout?: customLayout;
}

type childrenLayout =
  | ReactNode
  | ICustomComponentLayout
  | Array<ICustomComponentLayout>;

export type {
  IPropsComponentLayout,
  posibleMovement,
  customLayout,
  IContextStore,
  childrenLayout,
  ICustomComponentLayout,
};
