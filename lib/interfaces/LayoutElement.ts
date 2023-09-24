import { direction } from './Reusable';
import { dynamicLayout, layoutElement } from './GridLayout';

interface IPropsLayoutElement {
  element: layoutElement;
  layout: dynamicLayout;
  dragging?: layoutElement;
  moveELement?: (
    dragging: layoutElement,
    element: layoutElement,
    direction: direction
  ) => void;
  moveToTheTop?: (element: layoutElement) => void;
  onClickFullScreen?: () => void;
  onClickMove?: () => void;
  onClickClose?: () => void;
  cancelSelection?: () => void;
  childrens?: Array<JSX.Element>;
  fullScreen?: layoutElement;
}

export type { IPropsLayoutElement };
