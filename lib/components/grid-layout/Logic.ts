import {
  IPropsGridLayout,
  direction,
  dynamicLayout,
  layoutElement,
  orientation,
} from "../../interfaces";
import { useCallback, useState } from "react";

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

const Logic = ({ layout, setLayout }: IPropsGridLayout) => {
  const [dragging, setDragging] = useState<layoutElement>();
  const [fullScreen, setFullScreen] = useState<layoutElement>();

  const saveLayout = (layout: dynamicLayout) => {
    const customLayot = JSON.stringify(layout);
    localStorage.setItem("customLayout", customLayot);
  };

  const setter = useCallback(
    (newLayout: dynamicLayout) => {
      const balancedLayout = balance(newLayout);
      saveLayout(balancedLayout);
      setLayout(balancedLayout);
    },
    [setLayout]
  );

  const handleSwitch = useCallback(
    (element: layoutElement) => {
      if (dragging) {
        setDragging(undefined);
        const switchedElement = switchElement(layout, element, dragging);
        saveLayout(switchedElement);
        setLayout(switchedElement);
        return;
      }
      setDragging(element);
    },
    [dragging, layout, setLayout]
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
    moveElement,
    handleSwitch,
    handleMove,
    dragging,
    layout,
    moveToTheTop,
    deleteFromLayout,
    fullScreen,
    handleFullScreen,
    cancelSelection,
    saveLayout,
  };
};

export default Logic;
