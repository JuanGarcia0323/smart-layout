import { ReactNode, useCallback } from "react";
import {
  dynamicLayout,
  layoutElement,
  IElementContainer,
  direction,
  orientation,
  storedLayout,
} from "../../interfaces";
import { useState } from "react";

const _version = "1.3.6";

const switchElement = (
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

const reorganizeItems = (
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

const moveElement = (
  layout: dynamicLayout,
  element: layoutElement,
  elementToSwitch: layoutElement,
  directionInsert: direction
) => {
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

  if (
    (directionInsert === "right" || directionInsert === "left") &&
    (parentElement?.orientation === "vertical" || !parentElement)
  ) {
    const reor_i = reorganizeItems(
      repositionedLayout,
      element,
      elementToSwitch,
      elementToSwitch.parentId,
      indexToSwitch,
      "horizontal"
    );
    return reor_i;
  }

  if (
    (directionInsert === "top" || directionInsert === "bottom") &&
    (parentElement?.orientation === "horizontal" || !parentElement)
  ) {
    const reor_i = reorganizeItems(
      repositionedLayout,
      element,
      elementToSwitch,
      elementToSwitch.parentId,
      indexToSwitch,
      "vertical"
    );
    return reor_i;
  }

  return repositionedLayout;
};

const balance = (layout: dynamicLayout): dynamicLayout => {
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

const saveLayout = (layout: dynamicLayout, layoutID: string) => {
  const layoutToStore: storedLayout = { version: _version, layout };
  const customLayot = JSON.stringify(layoutToStore);
  localStorage.setItem(layoutID, customLayot);
};

const convertChildrenToLayout = (
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

// Custom-hook
const LogicContext = () => {
  const [layout, setLayout] = useState<dynamicLayout>([]);
  const [elements, setElements] = useState<IElementContainer[]>([]);
  const [dragging, setDragging] = useState<layoutElement>();
  const [fullScreen, setFullScreen] = useState<layoutElement>();
  const [layoutID, setLayoutID] = useState<string>();

  const startLayout = useCallback(
    (children: ReactNode, id: string, names?: string[] | number[]) => {
      if (!children) {
        setLayout([]);
        setElements([]);
        return;
      }
      setLayoutID(id);
      if (!Array.isArray(children)) {
        setElements([convertChildrenToElementContainer(children, 1, id)]);
        setLayout([convertChildrenToLayout(1, id, names?.[0])]);
        return;
      }
      const newLayout: dynamicLayout = [];
      const newElements: IElementContainer[] = [];
      children.forEach((element, i) => {
        if (!element) {
          return;
        }
        newLayout.push(convertChildrenToLayout(i, id, names?.[i]));
        newElements.push(convertChildrenToElementContainer(element, i, id));
      });
      setLayout(newLayout);
      setElements(newElements);
    },
    []
  );

  const setter = useCallback(
    (newLayout: dynamicLayout) => {
      if (!layoutID) {
        return;
      }
      const balancedLayout = balance(newLayout);
      saveLayout(balancedLayout, layoutID);
      setLayout(balancedLayout);
    },
    [layoutID, setLayout]
  );

  const handleSwitch = useCallback(
    (element: layoutElement) => {
      if (dragging && layoutID) {
        setDragging(undefined);
        const switchedElement = switchElement(layout, element, dragging);
        saveLayout(switchedElement, layoutID);
        setLayout(switchedElement);
        return;
      }
      setDragging(element);
    },
    [dragging, layout, layoutID, setLayout]
  );

  const handleMove = useCallback(
    (
      dragging: layoutElement,
      element: layoutElement,
      directionInsert: direction
    ) => {
      const reorganizedElements = moveElement(
        layout,
        dragging,
        element,
        directionInsert
      );
      setter(reorganizedElements);
      setDragging(undefined);
    },
    [layout, setter]
  );

  const moveToTheTop = useCallback(
    (element?: layoutElement) => {
      if (!element) {
        return;
      }
      element.parentId = -1;
      setter(Array.from(layout));
      setDragging(undefined);
    },
    [layout, setter]
  );

  const deleteFromLayout = useCallback(
    (layout: dynamicLayout, element: layoutElement) => {
      setter(
        layout.filter((e) => {
          return e.id !== element.id;
        })
      );
      setFullScreen(undefined);
    },
    [setter]
  );

  const handleFullScreen = (element: layoutElement) => {
    if (fullScreen?.id === element.id) {
      setFullScreen(undefined);
      return;
    }

    setFullScreen(element);
  };

  const cancelSelection = () => {
    setDragging(undefined);
  };

  return {
    layout,
    setLayout,
    elements,
    startLayout,
    setElements,
    switchElement,
    moveElement,
    balance,
    saveLayout,
    setDragging,
    dragging,
    setFullScreen,
    fullScreen,
    handleFullScreen,
    cancelSelection,
    deleteFromLayout,
    moveToTheTop,
    handleSwitch,
    handleMove,
    _version,
  };
};

export default LogicContext;
