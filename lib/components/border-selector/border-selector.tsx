import { IPropsBorderSelector } from "../../interfaces";
import Logic from "./Logic";
import styles from "./styles.module.css";

const BorderSelector = ({
  action,
  className,
  position,
  customStyle,
}: IPropsBorderSelector) => {
  const { handlePosition } = Logic();

  return (
    <span
      style={customStyle}
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
