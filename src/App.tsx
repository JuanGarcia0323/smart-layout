import { useState } from "react";
import { ComponentLayout } from "../lib/main";
import { customLayout } from "../lib/interfaces";
import TestCounter from "./TestCounter";
function App() {
  const [layout, setLayout] = useState<customLayout>();
  const [show, setShow] = useState(true);
  const [elements] = useState<Array<number>>([1, 2, 3, 4]);

  const twoByTwo = () => {
    const newLayout: customLayout = {
      name: new Date().getTime().toString(),
      layout: [
        {
          id: 1697032849065,
          key: "1697032849065",
          orientation: "vertical",
          direction: [0],
          children: [],
        },
        {
          id: 1,
          key: "1starting-layout",
          orientation: "horizontal",
          direction: [1],
          children: [],
        },
        {
          id: 0,
          key: "0starting-layout",
          orientation: "horizontal",
          direction: [2],
          children: [],
        },
        {
          id: 2,
          key: "2starting-layout",
          orientation: "horizontal",
          direction: [3],
          children: [],
        },
        {
          id: 1697032205830,
          key: "1697032205830",
          orientation: "vertical",
          direction: [4],
          children: [],
        },
        {
          id: 3,
          key: "3starting-layout",
          orientation: "horizontal",
          direction: [5],
          children: [],
        },
      ],
    };
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
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          gap: 8,
        }}
      >
        <div className="menu-bar">
          <button className="" onClick={twoByTwo}>
            Layout 2x2
          </button>
          <button className="" onClick={() => setShow(!show)}>
            Show Hide
          </button>
        </div>
        <div className="container">
          <ComponentLayout
            id="starting-layout"
            config={{
              classNameLayoutElement: "test",
              elementsNames: elements,
              customLayout: layout,
            }}
          >
            <TestCounter></TestCounter>
            {show && (
              <div
                id="element"
                style={{ width: "100%", height: "100%", background: "#000" }}
              ></div>
            )}

            <div
              id="element"
              style={{ width: "100%", height: "100%", background: "#000" }}
            ></div>

            <div
              id="element"
              style={{ width: "100%", height: "100%", background: "#000" }}
            ></div>

            <div
              id="element"
              style={{ width: "100%", height: "100%", background: "#000" }}
            ></div>
          </ComponentLayout>
        </div>
      </div>
    </div>
  );
}

export default App;
