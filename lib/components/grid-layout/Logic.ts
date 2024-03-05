import {
  IContextStore,
  IPropsGridLayout,
  dynamicLayout,
  storedLayout,
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
    handleFullScreen,
    handleMove,
    handleSwitch,
    moveToTheTop,
    saveLayout,
  } = actions!;
  const { elements, layout, dragging, fullScreen, _version } = state!;
  const { customLayout } = config ?? {};

  useEffect(() => {
    startLayout(children, layoutID, config?.elementsNames);
  }, [children, config?.elementsNames, layoutID, startLayout]);

  useEffect(() => {
    if (!children || !Array.isArray(children)) {
      return;
    }
    const childrenLength = children.filter((e) => e).length;
    debugger;
    if (
      customLayout?.layout &&
      customLayout.name !== lastCustomLayout &&
      customLayout.layout.length > 0 &&
      customLayout.layout.filter((e) => e.id < 300).length <= childrenLength
    ) {
      const layoutToStore: storedLayout = {
        layout: customLayout.layout,
        version: _version,
      };
      localStorage.setItem(layoutID, JSON.stringify(layoutToStore));
      lastCustomLayout = customLayout.name;
      setLayout(customLayout.layout);
      return;
    }
    const storedLayout = localStorage.getItem(layoutID);
    if (!storedLayout) {
      return;
    }
    const parsedLayout: storedLayout = JSON.parse(storedLayout);
    if (parsedLayout.version !== _version) {
      localStorage.removeItem(layoutID);
      return;
    }
    const originalElementLayout: dynamicLayout = parsedLayout.layout.filter(
      (e) => e.id < 300
    );
    if (
      (config?.elementsNames?.length && !originalElementLayout[0].name) ||
      (!!config?.elementsNames?.length &&
        config?.elementsNames?.length !== childrenLength)
    ) {
      localStorage.removeItem(layoutID);
      return;
    }
    if (
      originalElementLayout.length !== childrenLength ||
      (originalElementLayout.length > 1 && !Array.isArray(children))
    ) {
      localStorage.removeItem(layoutID);
      return;
    }
    setLayout(parsedLayout.layout);
  }, [
    _version,
    children,
    config?.elementsNames?.length,
    customLayout?.layout,
    customLayout?.name,
    layoutID,
    setLayout,
  ]);

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
