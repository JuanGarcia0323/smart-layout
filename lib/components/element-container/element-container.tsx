import { MutableRefObject } from "react";
import { IElementContainer } from "../../interfaces";
import Logic from "./Logic";
import styles from "./styles.module.css";

/**
 * This component is used to render the children of the ComponentLayout. It is responsible for handling the position of the elements on the screen and their seize
 * @param {IElementContainer} props
 */
const ElementContainer = (props: IElementContainer) => {
  const { element, dragging, fullScreen, cancelSelection } = props;
  const { ref } = Logic(props);
  return (
    <div
      className={` 
      ${styles["element-container-default-state"]}
      ${
        fullScreen &&
        fullScreen.key !== props.id &&
        styles["element-container-fullscreen-happening"]
      } 
      ${dragging && dragging.id.toString() === props.id && "cursor-pointer"}
      layout-element-container
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
