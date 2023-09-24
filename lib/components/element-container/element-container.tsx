import { MutableRefObject } from "react";
import Logic from "./Logic";
import { IElementContainer } from "../../interfaces";
import styles from "./styles.module.css";

const ElementContainer = (props: IElementContainer) => {
  const { element, dragging, fullScreen, cancelSelection } = props;
  const { ref } = Logic(props);
  return (
    <div
      className={` 
      ${styles["element-container-default-state"]}
      ${
        fullScreen &&
        fullScreen.id.toString() !== props.id &&
        styles["element-container-fullscreen-happening"]
      } 
      ${dragging && dragging.id.toString() === props.id && "cursor-pointer"}
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
