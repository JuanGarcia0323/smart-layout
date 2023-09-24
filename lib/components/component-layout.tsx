import { IPropsComponentLayout } from "../interfaces";
import Logic from "./Logic";
import GridLayout from "./grid-layout/grid-layout";

export function ComponentLayout({ children }: IPropsComponentLayout) {
  const { layout, setLayout, elements, startLayout } = Logic({ children });

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
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
