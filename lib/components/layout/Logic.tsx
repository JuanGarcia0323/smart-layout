import { useEffect, useCallback, ReactNode } from "react";
import {
  IPropsComponentLayout,
  dynamicLayout,
  layoutElement,
  IElementContainer,
} from "../../interfaces";
import { useState } from "react";

const convertChildrenToLayout = (
  id: number,
  layoutId: string
): layoutElement => {
  const newObject: layoutElement = {
    id: id,
    key: id.toString() + layoutId,
    orientation: "horizontal",
    parentId: -1,
  };

  return newObject;
};

const convertChildrenToElementContainer = (
  children: ReactNode,
  id: number,
  layoutId: string
): IElementContainer => {
  const newObject: IElementContainer = {
    element: children,
    key: (id * 2).toString(),
    id: id.toString() + layoutId,
    layoutId,
  };
  return newObject;
};

let lastCustomLayout: string = "";

const Logic = ({ children, id, customLayout }: IPropsComponentLayout) => {
  const [layout, setLayout] = useState<dynamicLayout>([]);
  const [elements, setElements] = useState<IElementContainer[]>([]);

  const startLayout = useCallback(() => {
    if (!children) {
      setLayout([]);
      setElements([]);
      return;
    }
    if (!Array.isArray(children)) {
      setElements([convertChildrenToElementContainer(children, 1, id)]);
      setLayout([convertChildrenToLayout(1, id)]);
      return;
    }
    const newLayout: dynamicLayout = [];
    const newElements: IElementContainer[] = [];
    children.forEach((element, i) => {
      if (!element) {
        return;
      }
      newLayout.push(convertChildrenToLayout(i, id));
      newElements.push(convertChildrenToElementContainer(element, i, id));
    });
    setLayout(newLayout);
    setElements(newElements);
  }, [children, id]);

  useEffect(() => {
    startLayout();
  }, [children, startLayout]);

  useEffect(() => {
    if (
      children &&
      Array.isArray(children) &&
      customLayout?.layout &&
      customLayout.name !== lastCustomLayout &&
      customLayout.layout.length > 0 &&
      customLayout.layout.filter((e) => e.id < 300).length <= children.length
    ) {
      localStorage.setItem(id, JSON.stringify(customLayout.layout));
      lastCustomLayout = customLayout.name;
      setLayout(customLayout.layout);
      return;
    }
    const storedLayout = localStorage.getItem(id);
    if (!storedLayout) {
      return;
    }
    const parsedLayout: dynamicLayout = JSON.parse(storedLayout);
    const originalElementLayout: dynamicLayout = parsedLayout.filter(
      (e) => e.id < 300
    );
    if (
      (Array.isArray(children) &&
        children &&
        originalElementLayout.length !== children.length) ||
      (originalElementLayout.length > 1 && !Array.isArray(children))
    ) {
      localStorage.removeItem(id);
      return;
    }
    setLayout(parsedLayout);
  }, [children, customLayout, id]);

  return { layout, setLayout, elements, startLayout };
};

export default Logic;
