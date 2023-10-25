import Logic from "./Logic";
import { IPropsLayoutElement } from "../../interfaces";
import { memo, useContext } from "react";
import LayoutContext from "../layout/Context";
import BorderSelector from "../border-selector/border-selector";
import MenuBar from "../menu-bar/menu-bar";
import styles from "./styles.module.css";

/**
 * This component is used to render the elements of the layout and handle the move, drop and nesting of the elements
 * @param {IPropsLayoutElement} props
 */
const LayoutElement = memo(
  ({ element, childrens, config }: IPropsLayoutElement) => {
    const { state } = useContext(LayoutContext);
    const { layout, dragging, fullScreen } = state!;
    const {
      classNameLayoutElement,
      hideMenubar,
      limitMovement,
      disableClose,
      disableFullscreen,
      disableMove,
      disableMoveToTheTop,
      cancelSelection,
      changeFullScreen,
      handleMove,
      move,
      moveTop,
      onClose,
    } = Logic({
      config,
      element,
    });
    return (
      <div
        id={element.key}
        key={element.key}
        className={`
        ${styles["layout-element-default-state"]} 
        ${
          element.orientation === "vertical" &&
          styles["layout-element-vertical"]
        } 
        ${
          dragging?.key === element.key &&
          styles["layout-element-dragging-state"]
        } 
        ${element.className} 
        ${classNameLayoutElement}
        ${
          fullScreen?.key === element.key &&
          styles["layout-element-fullscreen-state"]
        }
      `}
        onClick={(e) => {
          if (element.id === dragging?.id && cancelSelection) {
            e.stopPropagation();
            cancelSelection();
          }
        }}
      >
        {!childrens?.length &&
          !(dragging?.key === element.key) &&
          !hideMenubar && (
            <MenuBar
              dragging={!!dragging}
              onClickClose={onClose && (() => onClose(element))}
              onClickMove={move && (() => move(element))}
              onClickFullScreen={
                changeFullScreen && (() => changeFullScreen(element))
              }
              moveToTheTop={moveTop && (() => moveTop(element))}
              disableMoveToTheTop={
                element.parentId === -1 || disableMoveToTheTop
              }
              disableFullScreen={!!dragging || disableFullscreen}
              disableClose={!!fullScreen || !!dragging || disableClose}
              disableMove={
                !!fullScreen ||
                (element.parentId === -1 && layout?.length < 2) ||
                disableMove
              }
            />
          )}
        {dragging && !(dragging?.key === element.key) && !childrens?.length && (
          <>
            {(!limitMovement || limitMovement === "vertical") && (
              <>
                <BorderSelector
                  action={() => {
                    handleMove && handleMove(dragging, element, "top");
                  }}
                  position="top"
                />
                <BorderSelector
                  action={() => {
                    handleMove && handleMove(dragging, element, "bottom");
                  }}
                  position="bottom"
                />
              </>
            )}
            {(!limitMovement || limitMovement === "horizontal") && (
              <>
                <BorderSelector
                  action={() => {
                    handleMove && handleMove(dragging, element, "left");
                  }}
                  position="left"
                />
                <BorderSelector
                  action={() => {
                    handleMove && handleMove(dragging, element, "right");
                  }}
                  position="right"
                />
              </>
            )}
          </>
        )}

        {!!childrens?.length &&
          dragging &&
          childrens.length > 1 &&
          dragging.parentId !== element.id && (
            <>
              {(!limitMovement || limitMovement === "vertical") && (
                <>
                  <BorderSelector
                    customStyle={{ height: "4%", zIndex: 4 }}
                    action={() => {
                      handleMove && handleMove(dragging, element, "top");
                    }}
                    position="top"
                  />
                  <BorderSelector
                    customStyle={{ height: "4%", zIndex: 4 }}
                    action={() => {
                      handleMove && handleMove(dragging, element, "bottom");
                    }}
                    position="bottom"
                  />
                </>
              )}
              {(!limitMovement || limitMovement === "horizontal") && (
                <>
                  <BorderSelector
                    customStyle={{ width: "4%", zIndex: 4 }}
                    action={() => {
                      handleMove && handleMove(dragging, element, "left");
                    }}
                    position="left"
                  />
                  <BorderSelector
                    customStyle={{ width: "4%", zIndex: 4 }}
                    action={() => {
                      handleMove && handleMove(dragging, element, "right");
                    }}
                    position="right"
                  />
                </>
              )}
            </>
          )}
        {childrens}
      </div>
    );
  }
);

export default LayoutElement;
