import { ReactNode, useCallback } from "react";
import {
  dynamicLayout,
  layoutElement,
  IElementContainer,
  positions,
} from "../../interfaces";
import { useState } from "react";
import {
  convertChildrenToElementContainer,
  convertChildrenToLayout,
  _version,
  saveLayout,
  switchNode,
  moveNodes,
  moveToTheTop,
  assignDirections,
} from "../../LogicLayout";

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
        setLayout(
          assignDirections([convertChildrenToLayout(1, id, names?.[0])])
        );
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
      setLayout(assignDirections(newLayout));
      setElements(newElements);
    },
    []
  );

  const setter = useCallback(
    (newLayout: dynamicLayout) => {
      if (!layoutID) {
        return;
      }
      saveLayout(newLayout, layoutID);
      setLayout(Array.from(newLayout));
    },
    [layoutID, setLayout]
  );

  const handleSwitch = useCallback(
    (element: layoutElement) => {
      if (dragging && layoutID) {
        setDragging(undefined);
        const switchedElement = switchNode(layout, element, dragging);
        saveLayout(switchedElement, layoutID);
        setter(switchedElement);
        return;
      }
      setDragging(element);
    },
    [dragging, layout, layoutID, setter]
  );

  const handleMove = useCallback(
    (
      dragging: layoutElement,
      element: layoutElement,
      directionInsert: positions
    ) => {
      const reorganizedElements = moveNodes(
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

  const toTheTop = useCallback(
    (element: layoutElement) => {
      setter(moveToTheTop(layout, element.direction));
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
    switchNode,
    moveToTheTop: toTheTop,
    moveNodes,
    saveLayout,
    setDragging,
    dragging,
    setFullScreen,
    fullScreen,
    handleFullScreen,
    cancelSelection,
    handleSwitch,
    handleMove,
    _version,
  };
};

export default LogicContext;
