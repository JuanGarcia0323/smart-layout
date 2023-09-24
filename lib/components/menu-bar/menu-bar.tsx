import {
  CloseOutlined,
  DragOutlined,
  FullscreenOutlined,
  ToTopOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import Button from "@components/button/Button";
import { IPropsMenuBar } from "../../interfaces";
import { Tooltip } from "antd";

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
  const buttonStyle =
    "w-10 h-8 text-center z-[100000] bg-background border-none ";
  return (
    <div className={`w-full absolute ${className}`}>
      <div className="w-full h-full flex flex-wrap overflow-hidden justify-end items-center">
        {children}
        {!!onClickMove && (
          <Tooltip
            placement="bottom"
            title="Move and resize element"
            mouseEnterDelay={0.7}
          >
            <Button
              className={` rounded-none rounded-bl ${buttonStyle}`}
              onClick={onClickMove}
              disabled={disableMove}
              type="primary"
              icon={dragging ? <SwapOutlined /> : <DragOutlined />}
            />
          </Tooltip>
        )}
        {!!onClickFullScreen && (
          <Tooltip placement="bottom" title="Fullscreen" mouseEnterDelay={0.7}>
            <Button
              className={`rounded-none ${buttonStyle}`}
              onClick={onClickFullScreen}
              disabled={disableFullScreen}
              icon={<FullscreenOutlined />}
            />
          </Tooltip>
        )}
        {!!moveToTheTop && (
          <Tooltip
            placement="bottom"
            title="Separate element"
            mouseEnterDelay={0.7}
          >
            <Button
              className={`rounded-none ${buttonStyle}`}
              onClick={moveToTheTop}
              disabled={disableMoveToTheTop}
              icon={<ToTopOutlined />}
            />
          </Tooltip>
        )}
        {!!onClickClose && (
          <Tooltip
            placement="bottom"
            title="Remove element"
            mouseEnterDelay={0.7}
          >
            <Button
              className={` text-red-500  rounded-l-none rounded-r-none ${buttonStyle}`}
              onClick={onClickClose}
              disabled={disableClose}
              icon={<CloseOutlined />}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
