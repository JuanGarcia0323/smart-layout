import { IPropsComponentLayout } from "../../interfaces";
import GridLayout from "../grid-layout/grid-layout";
import styles from "./styles.module.css";
import LayoutProvider from "./Provider";

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
  config,
}: IPropsComponentLayout) {
  return (
    <LayoutProvider>
      <div className={styles["component-layout-parent-container"]}>
        <GridLayout layoutID={id} config={config}>
          {children}
        </GridLayout>
      </div>
    </LayoutProvider>
  );
}

export default ComponentLayout;
