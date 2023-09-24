import { IPropsBorderSelector } from "../../interfaces";
import Logic from "./Logic";
import styles from "./styles.module.css";

const BorderSelector = ({
  action,
  className,
  position,
}: IPropsBorderSelector) => {
  const { handlePosition } = Logic();

  return (
    <span
      className={`
      ${handlePosition(position)} 
      ${styles["border-selector-default"]} 
      ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        action();
      }}
    />
  );
};

export default BorderSelector;
