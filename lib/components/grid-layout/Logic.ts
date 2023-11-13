import { IContextStore, IPropsGridLayout } from "../../interfaces";
import { useContext, useEffect } from "react";
import LayoutContext from "../context/Context";

const Logic = ({ layoutID, children, config }: IPropsGridLayout) => {
  const { actions, state }: IContextStore = useContext(LayoutContext);
  const {
    startLayout,
    moveElement,
    cancelSelection,
    handleFullScreen,
    handleMove,
    handleSwitch,
    moveToTheTop,
    saveLayout,
  } = actions!;
  const { elements, layout, dragging, fullScreen } = state!;
  const { customLayout } = config ?? {};

  useEffect(() => {
    startLayout(children, layoutID, customLayout, config?.elementsNames);
  }, [children, config?.elementsNames, customLayout, layoutID, startLayout]);

  return {
    moveElement,
    handleSwitch,
    handleMove,
    dragging,
    layout,
    moveToTheTop,
    fullScreen,
    handleFullScreen,
    cancelSelection,
    saveLayout,
    elements,
  };
};

export default Logic;
