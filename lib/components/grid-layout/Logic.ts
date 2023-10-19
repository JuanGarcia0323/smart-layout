import {
  IContextStore,
  IPropsGridLayout,
  dynamicLayout,
} from "../../interfaces";
import { useContext, useEffect } from "react";
import LayoutContext from "../layout/Context";

let lastCustomLayout = "";

const Logic = ({ layoutID, children, customLayout }: IPropsGridLayout) => {
  const { actions, state }: IContextStore = useContext(LayoutContext);
  const {
    setLayout,
    startLayout,
    moveElement,
    cancelSelection,
    deleteFromLayout,
    handleFullScreen,
    handleMove,
    handleSwitch,
    moveToTheTop,
    saveLayout,
  } = actions!;
  const { elements, layout, dragging, fullScreen } = state!;

  useEffect(() => {
    startLayout(children, layoutID);
  }, [children, layoutID, startLayout]);

  useEffect(() => {
    if (
      children &&
      Array.isArray(children) &&
      customLayout?.layout &&
      customLayout.name !== lastCustomLayout &&
      customLayout.layout.length > 0 &&
      customLayout.layout.filter((e) => e.id < 300).length <= children.length
    ) {
      localStorage.setItem(layoutID, JSON.stringify(customLayout.layout));
      lastCustomLayout = customLayout.name;
      setLayout(customLayout.layout);
      return;
    }
    const storedLayout = localStorage.getItem(layoutID);
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
      localStorage.removeItem(layoutID);
      return;
    }
    setLayout(parsedLayout);
  }, [children, customLayout?.layout, customLayout?.name, layoutID, setLayout]);

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
    elements,
  };
};

export default Logic;
