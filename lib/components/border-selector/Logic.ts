import { direction, stylesForDirection } from "../../interfaces";
import styles from "./styles.module.css";
const Logic = () => {
  const handlePosition = (position: direction) => {
    const stylesForDirection: stylesForDirection = {
      right: styles["right-border-selector"],
      left: styles["left-border-selector"],
      top: styles["top-border-selector"],
      bottom: styles["bottom-border-selector"],
    };
    return stylesForDirection[position];
  };

  return { handlePosition };
};

export default Logic;
