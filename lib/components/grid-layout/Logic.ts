import {
  IContextStore,
  IPropsGridLayout,
  dynamicLayout,
} from "../../interfaces";
import { useContext, useEffect } from "react";
import LayoutContext from "../context/Context";

let lastCustomLayout = "";

const Logic = ({ layoutID, children, config }: IPropsGridLayout) => {
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
  const { customLayout } = config ?? {};

  useEffect(() => {
    startLayout(children, layoutID, config?.elementsNames);
  }, [children, config?.elementsNames, layoutID, startLayout]);

  useEffect(() => {
    if (!children || !Array.isArray(children)) {
      return;
    }
    const childrenLength = children.filter((e) => e).length;
    if (
      customLayout?.layout &&
      customLayout.name !== lastCustomLayout &&
      customLayout.layout.length > 0 &&
      customLayout.layout.filter((e) => e.id < 300).length <= childrenLength
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
      originalElementLayout.length !== childrenLength ||
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
