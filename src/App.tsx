import { useState } from "react";
import { ComponentLayout } from "../lib/main";
import { dynamicLayout } from "../lib/interfaces";
import TestCounter from "./TestCounter";
function App() {
  const [layout, setLayout] = useState<dynamicLayout>();
  const [counter, setCounter] = useState(0);

  const twoByTwo = () => {
    const newLayout: dynamicLayout = [
      {
        id: 1697032849065,
        key: "1697032849065",
        orientation: "vertical",
        parentId: -1,
      },
      {
        id: 1,
        key: "1starting-layout",
        orientation: "horizontal",
        parentId: 1697032849065,
      },
      {
        id: 0,
        key: "0starting-layout",
        orientation: "horizontal",
        parentId: 1697032849065,
      },
      {
        id: 2,
        key: "2starting-layout",
        orientation: "horizontal",
        parentId: 1697032205830,
      },
      {
        id: 1697032205830,
        key: "1697032205830",
        orientation: "vertical",
        parentId: -1,
      },
      {
        id: 3,
        key: "3starting-layout",
        orientation: "horizontal",
        parentId: 1697032205830,
      },
    ];
    setLayout(newLayout);
  };

  return (
    <div
      style={{
        background: "#010e23",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <button className="" onClick={twoByTwo}>
        Test
      </button>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          gap: 8,
        }}
      >
        <ComponentLayout id="starting-layout" customLayout={layout}>
          <div
            style={{ width: "100%", height: "100%", background: "black" }}
          ></div>
          <TestCounter />
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button onClick={() => setCounter(counter + 1)}>
              Click me {counter}
            </button>
          </div>
          <div style={{ width: "100%", height: "100%", background: "green" }} />
        </ComponentLayout>
      </div>
    </div>
  );
}

export default App;
