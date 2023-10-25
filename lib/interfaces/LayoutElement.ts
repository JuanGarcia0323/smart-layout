import { IConfig } from ".";
import { layoutElement } from "./GridLayout";

interface IPropsLayoutElement {
  element: layoutElement;
  childrens?: Array<JSX.Element>;
  config?: IConfig;
}

export type { IPropsLayoutElement };
