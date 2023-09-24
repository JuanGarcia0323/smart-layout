import { direction, stylesForDirection } from "../../interfaces";
const Logic = () => {
  const handlePosition = (position: direction) => {
    const stylesForDirection: stylesForDirection = {
      right: "top-0 right-0 w-2/6 h-full",
      left: "top-0 left-0 w-2/6 h-full",
      top: "top-0 left-0 h-3/6 w-full",
      bottom: "bottom-0 left-0 h-3/6 w-full",
    };
    return stylesForDirection[position];
  };

  return { handlePosition };
};

export default Logic;
