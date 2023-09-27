// import {
//   CloseOutlined,
//   DragOutlined,
//   FullscreenOutlined,
//   ToTopOutlined,
//   SwapOutlined,
// } from "@ant-design/icons";
// import Button from "@components/button/Button";
import { Fullscreen, Close, Move, Swap, MovetoTheTop } from "../../icons/index";
import { IPropsMenuBar } from "../../interfaces";
// import { Tooltip } from "antd";
import styles from "./styles.module.css";

const MenuBar = ({
  children,
  onClickClose,
  onClickMove,
  onClickFullScreen,
  disableClose,
  disableFullScreen,
  disableMove,
  moveToTheTop,
  disableMoveToTheTop,
  dragging,
}: IPropsMenuBar) => {
  return (
    <div className={styles["menubar-container"]}>
      <div className={styles["menubar"]}>
        {children}
        {!!onClickMove && (
          <button
            className={`${styles["menubar-button-swap"]} ${styles["menubar-button-default"]}`}
            onClick={onClickMove}
            disabled={disableMove}
          >
            {dragging ? <Swap /> : <Move />}
          </button>
        )}
        {!!onClickFullScreen && (
          <button
            className={styles["menubar-button-default"]}
            onClick={onClickFullScreen}
            disabled={disableFullScreen}
          >
            <Fullscreen />
          </button>
        )}
        {!!moveToTheTop && (
          <button
            className={styles["menubar-button-default"]}
            onClick={moveToTheTop}
            disabled={disableMoveToTheTop}
          >
            <MovetoTheTop />
          </button>
        )}
        {!!onClickClose && (
          <button
            className={`${styles["menubar-button-remove"]} ${styles["menubar-button-default"]}`}
            onClick={onClickClose}
            disabled={disableClose}
          >
            <Close />
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
