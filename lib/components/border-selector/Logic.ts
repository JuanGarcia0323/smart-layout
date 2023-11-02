import { direction, stylesForDirection } from "../../interfaces";
import styles from "./styles.module.css";
const Logic = () => {
  const handlePosition = (position: direction) => {
    const stylesForDirection: stylesForDirection = {
      right: `${styles["right-border-selector"]} right-border-selector-layout`,
      left: `${styles["left-border-selector"]} left-border-selector-layout`,
      top: `${styles["top-border-selector"]} top-border-selector-layout`,
      bottom: `${styles["bottom-border-selector"]} bottom-border-selector-layout`,
    };
    return stylesForDirection[position];
  };

  return { handlePosition };
};

export default Logic;
