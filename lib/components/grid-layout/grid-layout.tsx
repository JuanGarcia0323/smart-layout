import {
  IElementContainer,
  dynamicLayout,
  IPropsGridLayout,
} from "../../interfaces";
import { useCallback } from "react";
import LayoutElement from "../layout-element/layout-element";
import Logic from "./Logic";
import ElementContainer from "../element-container/element-container";
import styles from "./styles.module.css";

/**
 * This component is used to render the grid layout. It is responsible for rendering the elements and the layout
 * @param {IPropsGridLayout} props
 */
const GridLayout = (props: IPropsGridLayout) => {
  const { dragging, fullScreen, cancelSelection, elements, layout } =
    Logic(props);

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
            config={props.config}
            key={element.key}
            childrens={childrens}
            element={element}
          />
        );
      });
    },
    [props.config]
  );

  return (
    <div className={styles["grid-layout-main-container"]}>
      <div className={styles["grid-layout-parent-grid"]} id={props.layoutID}>
        {elements?.length &&
          elements?.map((element: IElementContainer) => {
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
            element={fullScreen}
            config={{
              ...props.config,
              disableMove: true,
              disableMoveToTheTop: true,
            }}
          />
        ) : (
          unfoldData(layout)
        )}
      </div>
    </div>
  );
};

export default GridLayout;
