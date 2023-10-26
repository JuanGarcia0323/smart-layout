import { IPropsLayoutElement } from "../../interfaces";
import { useContext } from "react";
import LayoutContext from "../context/Context";

const Logic = ({ config }: IPropsLayoutElement) => {
  const {
    hideMenubar,
    limitMovement,
    disableClose,
    disableFullscreen,
    disableMove,
    disableMoveToTheTop,
    onClose,
    onFullScreen,
    onMove,
    onMoveToTheTop,
    classNameLayoutElement,
  } = config ?? {};
  const { actions } = useContext(LayoutContext);
  const {
    cancelSelection,
    handleSwitch,
    handleFullScreen,
    moveToTheTop,
    handleMove,
  } = actions!;

  const checkIfFunction = <T>(
    func_one?: (v: T) => void,
    func_two?: (v: T) => void
  ) => {
    if (func_one && func_two)
      return (v: T) => {
        func_one(v);
        func_two(v);
      };
    return func_one || func_two;
  };

  const move = checkIfFunction(onMove, handleSwitch);
  const changeFullScreen = checkIfFunction(onFullScreen, handleFullScreen);
  const moveTop = checkIfFunction(onMoveToTheTop, moveToTheTop);

  return {
    classNameLayoutElement,
    hideMenubar,
    limitMovement,
    disableClose,
    disableFullscreen,
    disableMove,
    disableMoveToTheTop,
    move,
    changeFullScreen,
    moveTop,
    cancelSelection,
    handleMove,
    onClose,
  };
};

export default Logic;
