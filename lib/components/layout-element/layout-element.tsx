import { IPropsLayoutElement } from "../../interfaces";
import { memo } from "react";
import BorderSelector from "../border-selector/border-selector";
import MenuBar from "../menu-bar/menu-bar";
import styles from "./styles.module.css";

/**
 * This component is used to render the elements of the layout and handle the move, drop and nesting of the elements 
 * @param {IPropsLayoutElement} props
 */
const LayoutElement = memo(
  ({
    element,
    dragging,
    moveELement,
    onClickFullScreen,
    onClickMove,
    onClickClose,
    childrens,
    fullScreen,
    layout,
    cancelSelection,
    moveToTheTop,
    hideMenubar,
    limitMovement,
  }: IPropsLayoutElement) => {
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
              onClickMove={onClickMove}
              onClickClose={onClickClose}
              onClickFullScreen={onClickFullScreen}
              moveToTheTop={
                moveToTheTop &&
                (() => {
                  moveToTheTop(element);
                })
              }
              disableMoveToTheTop={element.parentId === -1}
              disableFullScreen={!!dragging}
              disableClose={!!fullScreen || !!dragging}
              disableMove={
                !!fullScreen || (element.parentId === -1 && layout?.length < 2)
              }
            />
          )}
        {dragging && !(dragging?.key === element.key) && !childrens?.length && (
          <>
            {(!limitMovement || limitMovement === "vertical") && (
              <>
                <BorderSelector
                  action={() => {
                    moveELement && moveELement(dragging, element, "top");
                  }}
                  position="top"
                />
                <BorderSelector
                  action={() => {
                    moveELement && moveELement(dragging, element, "bottom");
                  }}
                  position="bottom"
                />
              </>
            )}
            {(!limitMovement || limitMovement === "horizontal") && (
              <>
                <BorderSelector
                  action={() => {
                    moveELement && moveELement(dragging, element, "left");
                  }}
                  position="left"
                />
                <BorderSelector
                  action={() => {
                    moveELement && moveELement(dragging, element, "right");
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
                      moveELement && moveELement(dragging, element, "top");
                    }}
                    position="top"
                  />
                  <BorderSelector
                    customStyle={{ height: "4%", zIndex: 4 }}
                    action={() => {
                      moveELement && moveELement(dragging, element, "bottom");
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
                      moveELement && moveELement(dragging, element, "left");
                    }}
                    position="left"
                  />
                  <BorderSelector
                    customStyle={{ width: "4%", zIndex: 4 }}
                    action={() => {
                      moveELement && moveELement(dragging, element, "right");
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
