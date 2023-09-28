import { useState } from "react";
import { ComponentLayout } from "../lib/main";
function App() {
  const [elements, setElements] = useState<number[]>([]);
  const addElement = () => {
    setElements([...elements, new Date().getTime()]);
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
          height: "5%",
          width: "100%",
          display: "flex",
          padding: "0.5rem",
          border: "1px solid white",
        }}
      >
        <button
          onClick={addElement}
          style={{
            background: "transparent",
            border: "1px solid gray",
            borderRadius: "0.3rem",
            color: "white",
            cursor: "pointer",
          }}
        >
          Add Element
        </button>
      </div>
      <div
        style={{
          width: "100%",
          height: "95%",
          overflow: "hidden",
          display: "flex",
          gap: 8,
        }}
      >
        <ComponentLayout id="starting-layout">
          <div style={{ width: "100%", height: "100%", background: "gray" }} />
          <div
            style={{ width: "100%", height: "100%", background: "blue" }}
            className="test"
          />
          <div
            style={{ width: "100%", height: "100%", background: "orange" }}
            className="test"
          />

          <div
            style={{ width: "100%", height: "100%", background: "orange" }}
            className="test"
          />

          <div
            style={{ width: "100%", height: "100%", background: "orange" }}
            className="test"
          />
        </ComponentLayout>
      </div>
    </div>
  );
}

export default App;
