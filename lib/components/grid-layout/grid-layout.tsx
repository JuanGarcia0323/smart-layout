import { IPropsGridLayout, dynamicLayout } from "../../interfaces";
import { DeleteOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import LayoutElement from "../layout-element/layout-element";
import Logic from "./Logic";
import ElementContainer from "../element-container/element-container";
import { Popconfirm } from "antd";

const GridLayout = ({
  layout,
  setLayout,
  elements,
  startLayout,
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
  });

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
      moveToTheTop,
    ]
  );

  return (
    <div className="w-full h-full relative overflow-hidden no-scrollbar">
      <Popconfirm
        placement="left"
        title="Delete saved layout?"
        mouseEnterDelay={0.3}
        onConfirm={() => {
          localStorage.removeItem("customLayout");
          startLayout();
        }}
      >
        <div
          className="absolute w-20 rounded-full gap-2 h-20 -bottom-10 -right-10 z-[10000000000000] flex items-center justify-center overflow-hidden bg-error text-transparent  hover:text-white duration-300 transition-all hover:bottom-0 hover:right-0 cursor-pointer
          "
        >
          <DeleteOutlined className="w-full text-inherit text-center flex items-center justify-center text-xl transition-all duration-150"></DeleteOutlined>
        </div>
      </Popconfirm>
      <div
        className={`flex flex-col md:flex-row h-full rounded w-full overflow-auto gap-2 no-scrollbar `}
        id="parent-grid"
      >
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
