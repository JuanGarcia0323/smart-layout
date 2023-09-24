import { useEffect, useCallback, ReactNode } from "react";
import {
  IPropsComponentLayout,
  dynamicLayout,
  layoutElement,
  IElementContainer,
} from "../interfaces";
import { useState } from "react";

const convertChildrenToLayout = (id: number): layoutElement => {
  const newObject: layoutElement = {
    id: id,
    key: id.toString(),
    orientation: "horizontal",
    parentId: -1,
  };

  return newObject;
};

const convertChildrenToElementContainer = (
  children: ReactNode,
  id: number
): IElementContainer => {
  const newObject: IElementContainer = {
    element: children,
    key: (id * 2).toString(),
    id: id.toString(),
  };
  return newObject;
};

const Logic = ({ children }: IPropsComponentLayout) => {
  const [layout, setLayout] = useState<dynamicLayout>([]);
  const [elements, setElements] = useState<IElementContainer[]>([]);

  const startLayout = useCallback(() => {
    if (!children) {
      return;
    }
    if (!Array.isArray(children)) {
      setElements([convertChildrenToElementContainer(children, 1)]);
      setLayout([convertChildrenToLayout(1)]);
      return;
    }
    const newLayout: dynamicLayout = [];
    const newElements: IElementContainer[] = [];
    children.forEach((element, i) => {
      newLayout.push(convertChildrenToLayout(i));
      newElements.push(convertChildrenToElementContainer(element, i));
    });
    setLayout(newLayout);
    setElements(newElements);
  }, [children]);

  useEffect(() => {
    startLayout();
  }, [children, startLayout]);

  useEffect(() => {
    const storedLayout = localStorage.getItem("customLayout");
    if (!storedLayout) {
      return;
    }
    const customLayot: dynamicLayout = JSON.parse(storedLayout);
    const originalElementLayout: dynamicLayout = customLayot.filter(
      (e) => e.id < 300
    );
    if (
      (Array.isArray(children) &&
        children &&
        originalElementLayout.length !== children.length) ||
      (originalElementLayout.length > 1 && !Array.isArray(children))
    ) {
      localStorage.removeItem("customLayout");
      return;
    }
    setLayout(customLayot);
  }, [children]);

  return { layout, setLayout, elements, startLayout };
};

export default Logic;
