import { ReactNode } from "react";

interface IPropsMenuBar {
  children?: ReactNode;
  onClickFullScreen?: () => void;
  onClickClose?: () => void;
  onClickMove?: () => void;
  moveToTheTop?: () => void;
  disableFullScreen?: boolean;
  disableClose?: boolean;
  disableMove?: boolean;
  disableMoveToTheTop?: boolean;
  dragging?: boolean;
}

export type { IPropsMenuBar };
