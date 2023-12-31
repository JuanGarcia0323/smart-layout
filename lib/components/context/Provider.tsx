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
    balance,
    cancelSelection,
    dragging,
    fullScreen,
    handleFullScreen,
    handleMove,
    handleSwitch,
    moveElement,
    moveToTheTop,
    saveLayout,
    setDragging,
    setElements,
    setFullScreen,
    switchElement,
    _version,
  } = LogicContext();

  const value: IContextStore = useMemo(
    () => ({
      actions: {
        startLayout,
        setLayout,
        cancelSelection,
        balance,
        handleFullScreen,
        handleMove,
        handleSwitch,
        moveElement,
        moveToTheTop,
        saveLayout,
        setDragging,
        setElements,
        setFullScreen,
        switchElement,
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
      balance,
      cancelSelection,
      dragging,
      elements,
      fullScreen,
      handleFullScreen,
      handleMove,
      handleSwitch,
      layout,
      moveElement,
      moveToTheTop,
      saveLayout,
      setDragging,
      setElements,
      setFullScreen,
      setLayout,
      startLayout,
      switchElement,
    ]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;
