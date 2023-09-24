import { IPropsBorderSelector } from "../../interfaces";
import Logic from "./Logic";

const BorderSelector = ({
  action,
  className,
  position,
}: IPropsBorderSelector) => {
  const { handlePosition } = Logic();

  return (
    <span
      className={`${handlePosition(
        position
      )} absolute opacity-70 transition-all duration-150 ease-in-out cursor-pointer z-[10000] rounded hover:shadow-inner-custom ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        action();
      }}
    />
  );
};

export default BorderSelector;
