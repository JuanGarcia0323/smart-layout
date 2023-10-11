import { IPropsComponentLayout } from "../../interfaces";
import Logic from "./Logic";
import GridLayout from "../grid-layout/grid-layout";
import styles from "./styles.module.css";

/**
 * This component is used to render the grid layout. It is responsible for rendering the elements and the layout. Also it contains the current Logic of the component layout, where the layout is stored and initialized
 * @param {IPropsComponentLayout} props
 * @example
 * return (
 *   <ComponentLayout>
 *     <Form />
 *     <Grid />
 *   </ComponentLayout>
 */
export function ComponentLayout({
  children,
  id,
  hideMenuBar,
  limitMovement,
  customLayout,
}: IPropsComponentLayout) {
  const { layout, setLayout, elements, startLayout } = Logic({
    children,
    id,
    hideMenuBar,
    limitMovement,
    customLayout,
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
        hideMenubar={hideMenuBar}
      />
    </div>
  );
}

export default ComponentLayout;
