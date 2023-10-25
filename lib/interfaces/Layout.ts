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
  startLayout: (
    children: ReactNode,
    id: string,
    names?: string[] | number[]
  ) => void;
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

interface IConfig {
  disableFullscreen?: boolean;
  disableMove?: boolean;
  disableMoveToTheTop?: boolean;
  disableClose?: boolean;
  onFullScreen?: (element: layoutElement) => void;
  onMove?: (element: layoutElement) => void;
  onMoveToTheTop?: (element: layoutElement) => void;
  onClose?: (element: layoutElement) => void;
  hideMenubar?: boolean;
  limitMovement?: posibleMovement;
  customLayout?: customLayout;
  classNameLayoutElement?: string;
  elementsNames?: string[] | number[];
}

interface IPropsComponentLayout {
  children: ReactNode;
  id: string;
  config?: IConfig;
}

export type {
  IPropsComponentLayout,
  posibleMovement,
  customLayout,
  IContextStore,
  IConfig,
};
