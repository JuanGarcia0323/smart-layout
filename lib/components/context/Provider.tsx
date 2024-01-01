import { ReactNode, useMemo } from "react";
import LayoutContext from "./Context";
import { IContextStore } from "../../interfaces";
import LogicContext from "./LogicContext";

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const {
    elements,
    layout,
    setLayout,
    startLayout,
    cancelSelection,
    dragging,
    fullScreen,
    handleFullScreen,
    handleMove,
    handleSwitch,
    moveToTheTop,
    saveLayout,
    setDragging,
    setElements,
    setFullScreen,
    moveNodes,
    switchNode,
    _version,
  } = LogicContext();

  const value: IContextStore = useMemo(
    () => ({
      actions: {
        startLayout,
        setLayout,
        cancelSelection,
        handleFullScreen,
        handleMove,
        handleSwitch,
        moveToTheTop,
        saveLayout,
        setDragging,
        setElements,
        setFullScreen,
        moveNodes,
        switchNode,
      },
      state: {
        layout,
        dragging,
        fullScreen,
        elements,
        _version,
      },
    }),
    [
      _version,
      cancelSelection,
      dragging,
      elements,
      fullScreen,
      handleFullScreen,
      handleMove,
      handleSwitch,
      layout,
      moveNodes,
      moveToTheTop,
      saveLayout,
      setDragging,
      setElements,
      setFullScreen,
      setLayout,
      startLayout,
      switchNode,
    ]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;
