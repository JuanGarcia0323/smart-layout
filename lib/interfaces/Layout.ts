import { ReactNode } from "react";
import { dynamicLayout } from ".";

type posibleMovement = "horizontal" | "vertical";

type customLayout = {
  name: string;
  layout: dynamicLayout;
};

interface IPropsComponentLayout {
  children: ReactNode;
  id: string;
  hideMenuBar?: boolean;
  limitMovement?: posibleMovement;
  customLayout?: customLayout;
}

export type { IPropsComponentLayout, posibleMovement, customLayout };
