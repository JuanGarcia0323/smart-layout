import { useState } from "react";
import { ComponentLayout } from "../lib/main";
import { customLayout } from "../lib/interfaces";
import TestCounter from "./TestCounter";
function App() {
  const [layout, setLayout] = useState<customLayout>();
  const [show, setShow] = useState(true);

  const twoByTwo = () => {
    const newLayout: customLayout = {
      name: new Date().getTime().toString(),
      layout: [
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
          {show && (
            <ComponentLayout id="starting-layout" customLayout={layout}>
              <div
                style={{ width: "100%", height: "100%", background: "black" }}
              ></div>
              <TestCounter />
              <TestCounter />
              <TestCounter />
            </ComponentLayout>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
