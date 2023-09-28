import { IPropsComponentLayout } from "../../interfaces";
import Logic from "./Logic";
import GridLayout from "../grid-layout/grid-layout";
import styles from "./styles.module.css";

export function ComponentLayout({
  children,
  id,
  hideMenuBar,
  limitMovement,
}: IPropsComponentLayout) {
  const { layout, setLayout, elements, startLayout } = Logic({
    children,
    id,
    hideMenuBar,
    limitMovement,
  });

  return (
    <div className={styles["component-layout-parent-container"]}>
      <GridLayout
        layoutId={id}
        layout={layout}
        setLayout={setLayout}
        elements={elements}
        startLayout={startLayout}
        limitMovement={limitMovement}
      />
    </div>
  );
}

export default ComponentLayout;
