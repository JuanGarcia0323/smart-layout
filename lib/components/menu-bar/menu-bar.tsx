// import {
//   CloseOutlined,
//   DragOutlined,
//   FullscreenOutlined,
//   ToTopOutlined,
//   SwapOutlined,
// } from "@ant-design/icons";
// import Button from "@components/button/Button";
import Fullscreen from "../../icons/Fullscreen";
import { IPropsMenuBar } from "../../interfaces";
// import { Tooltip } from "antd";
import styles from "./styles.module.css";

const MenuBar = ({
  children,
  className,
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
    <div className={`w-full absolute ${className}`}>
      <div className="w-full h-full flex flex-wrap overflow-hidden justify-end items-center">
        {children}
        {!!onClickMove && (
          // <Tooltip
          //   placement="bottom"
          //   title="Move and resize element"
          //   mouseEnterDelay={0.7}
          // >
          <button
            className={`${styles["menubar-button-swap"]} ${styles["menubar-button-default"]}`}
            onClick={onClickMove}
            disabled={disableMove}
            // type="primary"
            // icon={dragging ? <SwapOutlined /> : <DragOutlined />}
          >
            {dragging ? <Fullscreen /> : <Fullscreen />}
          </button>
          // </Tooltip>
        )}
        {!!onClickFullScreen && (
          // <Tooltip placement="bottom" title="Fullscreen" mouseEnterDelay={0.7}>
          <button
            className={styles["menubar-button-default"]}
            onClick={onClickFullScreen}
            disabled={disableFullScreen}
            // icon={<FullscreenOutlined />}
          >
            <Fullscreen />
          </button>
          // </Tooltip>
        )}
        {!!moveToTheTop && (
          // <Tooltip
          //   placement="bottom"
          //   title="Separate element"
          //   mouseEnterDelay={0.7}
          // >
          <button
            className={styles["menubar-button-default"]}
            onClick={moveToTheTop}
            disabled={disableMoveToTheTop}
            // icon={<FullscreenOutlined />}
          >
            <Fullscreen />
          </button>
          // </Tooltip>
        )}
        {!!onClickClose && (
          // <Tooltip
          //   placement="bottom"
          //   title="Remove element"
          //   mouseEnterDelay={0.7}
          // >
          <button
            className={`${styles["menubar-button-remove"]} ${styles["menubar-button-default"]}`}
            onClick={onClickClose}
            disabled={disableClose}
          >
            <Fullscreen />
          </button>
          // </Tooltip>
        )}
      </div>
    </div>
  );
};

export default MenuBar;