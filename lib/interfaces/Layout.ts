import { ReactNode } from "react";
import { IElementContainer, dynamicLayout, layoutElement, positions } from ".";
import { saveLayout } from "../LogicLayout";

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
  _version: string;
}

interface actionsContext {
  startLayout: (
    children: ReactNode,
    id: string,
    names?: string[] | number[]
  ) => void;
  setLayout: (layout: dynamicLayout) => void;
  handleMove: (
    dragging: layoutElement,
    element: layoutElement,
    directionInsert: positions
  ) => void;
  handleSwitch: (element: layoutElement) => void;
  moveToTheTop: (element: layoutElement) => void;
  handleFullScreen: (element: layoutElement) => void;
  cancelSelection: () => void;
  saveLayout: typeof saveLayout;
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
