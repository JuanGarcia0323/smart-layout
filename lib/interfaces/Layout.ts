import { ReactNode } from "react";
import { dynamicLayout } from ".";

type posibleMovement = "horizontal" | "vertical";

interface IPropsComponentLayout {
  children: ReactNode;
  id: string;
  hideMenuBar?: boolean;
  limitMovement?: posibleMovement;
  customLayout?: dynamicLayout;
}

export type { IPropsComponentLayout, posibleMovement };
