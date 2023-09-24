import { direction, stylesForDirection } from "../../interfaces";
const Logic = () => {
  const handlePosition = (position: direction) => {
    const stylesForDirection: stylesForDirection = {
      right: "right-border-selector",
      left: "left-border-selector",
      top: "top-border-selector",
      bottom: "bottom-border-selector",
    };
    return stylesForDirection[position];
  };

  return { handlePosition };
};

export default Logic;
