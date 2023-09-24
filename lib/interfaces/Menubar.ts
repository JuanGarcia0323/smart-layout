import { ReactNode } from 'react';

interface IPropsMenuBar {
  children?: ReactNode;
  className?: string;
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
