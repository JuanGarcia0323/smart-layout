import {
  dynamicLayout,
  layoutElement,
  orientation,
  direction,
  storedLayout,
  IElementContainer,
  customLayout,
} from "./interfaces";
import { ReactNode } from "react";

export const _version = "1.4.3";

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
    original: false,
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

      if (children.length <= 1 && !element.original) {
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
    original: true,
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

export const createLayout = (
  children: ReactNode,
  id: string,
  names?: string[] | number[]
): { layout: dynamicLayout; elements: IElementContainer[] } => {
  if (!children) {
    return { layout: [], elements: [] };
  }
  if (!Array.isArray(children)) {
    return {
      layout: [convertChildrenToLayout(1, id, names?.[0])],
      elements: [convertChildrenToElementContainer(children, 1, id)],
    };
  }

  const layout: dynamicLayout = [];
  const elements: IElementContainer[] = [];
  children.forEach((element, i) => {
    if (!element) {
      return;
    }
    layout.push(convertChildrenToLayout(i, id, names?.[i]));
    elements.push(convertChildrenToElementContainer(element, i, id));
  });
  return {
    layout,
    elements,
  };
};

export const restoreLayout = () => {
  let lastCustomLayout: string = "";

  const mergeLayouts = (
    layout: dynamicLayout,
    newLayout: dynamicLayout,
    originalLayout?: dynamicLayout,
    originalNewLayout?: dynamicLayout
  ) => {
    const layoutForFilter = originalLayout ? originalLayout : layout;
    const newLayoutForFilter = originalNewLayout
      ? originalNewLayout
      : newLayout;
    if (layoutForFilter.length > newLayoutForFilter.length) {
      const elementToRemove = layoutForFilter.find(
        (e) => !newLayoutForFilter.find((el) => e.id === el.id)
      );
      const balancedLayout = balance(
        layout.filter((e) => e.id !== elementToRemove?.id)
      );
      return balancedLayout;
    }
    const elementToAdd = newLayoutForFilter.find(
      (e) => !layoutForFilter.find((el) => e.id === el.id)
    );
    if (!elementToAdd) {
      return layout;
    }
    layout.push(elementToAdd);
    return layout;
  };

  return (
    children: ReactNode,
    layout: dynamicLayout,
    layoutID: string,
    customLayout?: customLayout,
    elementsNames?: string[] | number[]
  ) => {
    if (!children || !Array.isArray(children)) {
      return layout;
    }
    const existentChildren = children.filter((e) => e);
    if (
      customLayout?.layout &&
      customLayout.name !== lastCustomLayout &&
      customLayout.layout.length > 0 &&
      customLayout.layout.filter((e) => e.original).length <=
        existentChildren.length
    ) {
      const layoutToStore: storedLayout = {
        layout: customLayout.layout,
        version: _version,
      };
      localStorage.setItem(layoutID, JSON.stringify(layoutToStore));
      lastCustomLayout = customLayout.name;
      return customLayout.layout;
    }
    const storedLayout = localStorage.getItem(layoutID);
    if (!storedLayout) {
      return layout;
    }

    const parsedLayout: storedLayout = JSON.parse(storedLayout);
    if (parsedLayout.version !== _version) {
      localStorage.removeItem(layoutID);
      return layout;
    }

    const originalElementLayout = parsedLayout.layout.filter((e) => e.original);
    if (
      !elementsNames?.length &&
      !originalElementLayout[0].name &&
      elementsNames &&
      elementsNames?.length !== existentChildren.length
    ) {
      localStorage.removeItem(layoutID);
      return layout;
    }

    if (originalElementLayout.length !== existentChildren.length) {
      const mergedLayout = mergeLayouts(
        parsedLayout.layout,
        layout,
        originalElementLayout
      );
      const storedLayout: storedLayout = {
        layout: mergedLayout,
        version: _version,
      };
      localStorage.setItem(layoutID, JSON.stringify(storedLayout));
      return mergedLayout;
    }

    return parsedLayout.layout;
  };
};
