import { IPropsGridLayout, dynamicLayout } from "../../interfaces";
import { useCallback } from "react";
import LayoutElement from "../layout-element/layout-element";
import Logic from "./Logic";
import ElementContainer from "../element-container/element-container";
import styles from "./styles.module.css";

/**
 * This component is used to render the grid layout. It is responsible for rendering the elements and the layout
 * @param {IPropsGridLayout} props
 */
const GridLayout = ({
  layout,
  setLayout,
  elements,
  startLayout,
  layoutId,
  limitMovement,
  hideMenubar,
}: IPropsGridLayout) => {
  const {
    handleSwitch,
    dragging,
    handleMove,
    moveToTheTop,
    handleFullScreen,
    fullScreen,
    cancelSelection,
  } = Logic({
    layout,
    setLayout,
    elements,
    startLayout,
    layoutId,
    limitMovement,
  });

  /**
   * This recursive function is used to unfold the layout data
   * @param {dynamicLayout} layout
   * @param {number} parentId
   */
  const unfoldData = useCallback(
    (layout: dynamicLayout, parentId = -1) => {
      const parents = layout.filter((element) => element.parentId === parentId);
      return parents.map((element) => {
        const childrens = unfoldData(layout, element.id);
        return (
          <LayoutElement
            layout={layout}
            key={element.key}
            childrens={childrens}
            dragging={dragging}
            element={element}
            fullScreen={fullScreen}
            moveELement={handleMove}
            onClickFullScreen={() => handleFullScreen(element)}
            onClickMove={() => handleSwitch(element)}
            cancelSelection={cancelSelection}
            moveToTheTop={moveToTheTop}
            limitMovement={limitMovement}
            hideMenubar={hideMenubar}
          />
        );
      });
    },
    [
      cancelSelection,
      dragging,
      fullScreen,
      handleFullScreen,
      handleMove,
      handleSwitch,
      hideMenubar,
      limitMovement,
      moveToTheTop,
    ]
  );

  return (
    <div className={styles["grid-layout-main-container"]}>
      <div className={styles["grid-layout-parent-grid"]} id={layoutId}>
        {elements.map((element) => {
          return (
            <ElementContainer
              {...element}
              key={element.key}
              fullScreen={fullScreen}
              dragging={dragging}
              cancelSelection={cancelSelection}
            />
          );
        })}
        {fullScreen ? (
          <LayoutElement
            key={fullScreen.key}
            layout={layout}
            element={fullScreen}
            onClickFullScreen={() => handleFullScreen(fullScreen)}
          />
        ) : (
          unfoldData(layout)
        )}
      </div>
    </div>
  );
};

export default GridLayout;
