import { IPropsComponentLayout } from "../../interfaces";
import Logic from "./Logic";
import GridLayout from "../grid-layout/grid-layout";
import styles from "./styles.module.css";

export function ComponentLayout({ children }: IPropsComponentLayout) {
  const { layout, setLayout, elements, startLayout } = Logic({ children });

  return (
    <div className={styles["component-layout-parent-container"]}>
      <GridLayout
        layout={layout}
        setLayout={setLayout}
        elements={elements}
        startLayout={startLayout}
      />
    </div>
  );
}

export default ComponentLayout;
