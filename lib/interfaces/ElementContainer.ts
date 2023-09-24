import { ReactNode } from 'react';
import { layoutElement } from './GridLayout';

interface IElementContainer {
  id: string;
  key: string;
  element: ReactNode;
  fullScreen?: layoutElement;
  dragging?: layoutElement;
  cancelSelection?: () => void;
}

export type { IElementContainer };
