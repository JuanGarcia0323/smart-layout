import { ReactNode } from "react";
import { IConfig } from ".";

interface layoutElement {
  key: string;
  id: number;
  direction: number[];
  orientation: orientation;
  className?: string;
  name?: string | number;
  children: layoutElement[];
  original?: boolean;
}

interface IPropsGridLayout {
  children: ReactNode;
  layoutID: string;
  config?: IConfig;
}

type orientation = "vertical" | "horizontal";
type dynamicLayout = Array<layoutElement>;
type storedLayout = { layout: dynamicLayout; version: string };
type positions = "right" | "left" | "bottom" | "top";
type direction = number[];

export type {
  layoutElement,
  IPropsGridLayout,
  orientation,
  dynamicLayout,
  direction,
  storedLayout,
  positions,
};
