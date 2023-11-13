import { ReactNode, useCallback } from "react";
import {
  dynamicLayout,
  layoutElement,
  IElementContainer,
  direction,
  customLayout,
} from "../../interfaces";
import { useState } from "react";
import {
  balance,
  switchElement,
  saveLayout,
  moveElement,
  _version,
  createLayout,
  restoreLayout,
} from "../../LogicLayout";

const reLayout = restoreLayout();
// Custom-hook
const LogicContext = () => {
  const [layout, setLayout] = useState<dynamicLayout>([]);
  const [elements, setElements] = useState<IElementContainer[]>([]);
  const [dragging, setDragging] = useState<layoutElement>();
  const [fullScreen, setFullScreen] = useState<layoutElement>();
  const [layoutID, setLayoutID] = useState<string>();

  const startLayout = useCallback(
    (
      children: ReactNode,
      id: string,
      customLayout?: customLayout,
      names?: string[] | number[]
    ) => {
      if (children) {
        setLayoutID(id);
      }
      const newLayout = createLayout(children, id, names);
      const restoredLayout = reLayout(
        children,
        newLayout.layout,
        id,
        customLayout,
        names
      );
      setLayout(restoredLayout);
      setElements(newLayout.elements);
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
    moveToTheTop,
    handleSwitch,
    handleMove,
    _version,
  };
};

export default LogicContext;
