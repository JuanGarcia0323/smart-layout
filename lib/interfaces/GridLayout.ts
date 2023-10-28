import { ReactNode } from "react";
import { IConfig } from ".";

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
  name?: string | number;
}

interface IPropsGridLayout {
  children: ReactNode;
  layoutID: string;
  config?: IConfig;
}

type positionLayout = Array<position>;
type orientation = "vertical" | "horizontal";
type dynamicLayout = Array<layoutElement>;
type storedLayout = { layout: dynamicLayout; version: string };
type direction = "right" | "left" | "bottom" | "top";

export type {
  position,
  layoutElement,
  IPropsGridLayout,
  positionLayout,
  orientation,
  dynamicLayout,
  direction,
  storedLayout,
};
