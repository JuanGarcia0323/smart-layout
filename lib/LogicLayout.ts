import {
  dynamicLayout,
  layoutElement,
  orientation,
  direction,
  storedLayout,
  IElementContainer,
} from "./interfaces";
import { ReactNode } from "react";

export const _version = "1.4.2";

export const switchElement = (
  layout: dynamicLayout,
  element: layoutElement,
  elementToSwitch: layoutElement
) => {
  if (
    element.id === elementToSwitch.parentId ||
    element.parentId === elementToSwitch.id
  ) {
    return layout;
  }

  const copyElemenToSwitch = { ...elementToSwitch };
  elementToSwitch.parentId = element.parentId;
  element.parentId = copyElemenToSwitch.parentId;
  const newLayout = layout.map((elementLayout) => {
    if (elementLayout.id === element.id) {
      return elementToSwitch;
    }
    if (elementLayout.id === elementToSwitch.id) {
      return element;
    }
    return elementLayout;
  });
  return newLayout;
};

export const reorganizeItems = (
  layout: dynamicLayout,
  element: layoutElement,
  elementToSwitch: layoutElement,
  parentId: number,
  elementToSwitchIndex: number,
  orientation: orientation
) => {
  const newElementId = new Date().getTime();
  const newElement: layoutElement = {
    id: newElementId,
    key: `${newElementId}`,
    orientation,
    parentId: parentId,
  };
  const newLayout = layout.map((e) => {
    if (e.id === element.id || e.id === elementToSwitch.id) {
      e.parentId = newElementId;
    }
    return e;
  });

  newLayout.splice(elementToSwitchIndex, 0, newElement);
  return newLayout;
};

export const moveElement = (
  layout: dynamicLayout,
  element: layoutElement,
  elementToSwitch: layoutElement,
  directionInsert: direction
) => {
  // debugger;
  const repositionElement = (
    layout: dynamicLayout,
    elementToInsert: layoutElement,
    direction: direction
  ) => {
    const moveElement =
      direction === "left" || direction === "top"
        ? indexToSwitch
          ? -1
          : 0
        : +1;
    element.parentId = elementToSwitch.parentId;
    const newLayout = layout.filter(
      (layoutElement) => layoutElement.id !== element.id
    );
    newLayout.splice(indexToSwitch + moveElement, 0, elementToInsert);
    return newLayout;
  };

  const indexToSwitch = layout.findIndex(
    (layoutElement) => layoutElement.id === elementToSwitch.id
  );

  const parentElement = layout.find(
    (layoutElement) => layoutElement.id === elementToSwitch.parentId
  );

  if (
    element.id === elementToSwitch.parentId ||
    element.parentId === elementToSwitch.id
  ) {
    return layout;
  }

  const repositionedLayout = repositionElement(
    layout,
    element,
    directionInsert
  );

  const orientation: orientation =
    directionInsert === "right" || directionInsert === "left"
      ? "horizontal"
      : "vertical";

  if (parentElement?.orientation !== orientation || !parentElement) {
    return reorganizeItems(
      repositionedLayout,
      element,
      elementToSwitch,
      elementToSwitch.parentId,
      indexToSwitch,
      orientation
    );
  }

  return repositionedLayout;
};

export const balance = (layout: dynamicLayout): dynamicLayout => {
  const newLayout = layout
    .map((element) => {
      const children = layout.filter(
        (layoutELement) => layoutELement.parentId === element.id
      );

      if (children.length === 1) {
        children[0].parentId = element.parentId;
        return null;
      }

      return element;
    })
    .filter((e) => e);
  return newLayout as dynamicLayout;
};

export const saveLayout = (layout: dynamicLayout, layoutID: string) => {
  const layoutToStore: storedLayout = { version: _version, layout };
  const customLayot = JSON.stringify(layoutToStore);
  localStorage.setItem(layoutID, customLayot);
};

export const convertChildrenToLayout = (
  id: number,
  layoutId: string,
  name?: string | number
): layoutElement => {
  const newObject: layoutElement = {
    id: id,
    key: id.toString() + layoutId,
    orientation: "horizontal",
    parentId: -1,
    name,
  };

  return newObject;
};

export const convertChildrenToElementContainer = (
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
