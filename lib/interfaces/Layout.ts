import { ReactNode } from "react";

type posibleMovement = "horizontal" | "vertical";

interface IPropsComponentLayout {
  children: ReactNode;
  id: string;
  hideMenuBar: boolean;
  limitMovement?: posibleMovement;
}

export type { IPropsComponentLayout, posibleMovement };
