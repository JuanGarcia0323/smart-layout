import { MutableRefObject } from "react";
import Logic from "./Logic";
import { IElementContainer } from "../../interfaces";

const ElementContainer = (props: IElementContainer) => {
  const { element, dragging, fullScreen, cancelSelection } = props;
  const { ref } = Logic(props);
  return (
    <div
      className={`absolute z-[1000] transition-all duration-500 ${
        fullScreen && fullScreen.id.toString() !== props.id && " hidden"
      } ${dragging && dragging.id.toString() === props.id && "cursor-pointer"}
      overflow-hidden rounded 
      `}
      onClick={() => {
        dragging &&
          dragging.id.toString() &&
          cancelSelection &&
          cancelSelection();
      }}
      ref={ref as MutableRefObject<HTMLDivElement>}
    >
      {element}
    </div>
  );
};

export default ElementContainer;
