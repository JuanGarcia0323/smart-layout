import { IPropsLayoutElement } from "../../interfaces";
import { memo } from "react";
import BorderSelector from "../border-selector/border-selector";
import MenuBar from "../menu-bar/menu-bar";

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
  }: IPropsLayoutElement) => {
    return (
      <div
        id={element.id.toString()}
        key={element.key}
        className={`w-full max-w-full h-full flex relative 
      ${element.orientation === "vertical" && "flex-col"} gap-2 rounded 
      ${
        dragging?.key === element.key &&
        "shadow-inner-custom z-[100000000000] opacity-60 bg-primary cursor-pointer hover:bg-error hover:shadow-none"
      } 
      ${element.className} 
       overflow-hidden transition-all duration-100 ease-in-out
      `}
        onClick={(e) => {
          if (element.id === dragging?.id && cancelSelection) {
            e.stopPropagation();
            cancelSelection();
          }
        }}
      >
        {!childrens?.length && !(dragging?.key === element.key) && (
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

        {!!childrens?.length &&
          dragging &&
          childrens.length > 1 &&
          dragging.parentId !== element.id && (
            <>
              <BorderSelector
                className=" h-[4%] z-[11000]"
                action={() => {
                  moveELement && moveELement(dragging, element, "top");
                }}
                position="top"
              />
              <BorderSelector
                className=" h-[4%] z-[11000]"
                action={() => {
                  moveELement && moveELement(dragging, element, "bottom");
                }}
                position="bottom"
              />
              <BorderSelector
                className="w-[4%] z-[11000]"
                action={() => {
                  moveELement && moveELement(dragging, element, "left");
                }}
                position="left"
              />
              <BorderSelector
                className="w-[4%] z-[11000]"
                action={() => {
                  moveELement && moveELement(dragging, element, "right");
                }}
                position="right"
              />
            </>
          )}
        {childrens}
      </div>
    );
  }
);

export default LayoutElement;
