import { useState } from "react";
import { ComponentLayout } from "../lib/main";
function App() {
  const [show, setShow] = useState<boolean>(false);

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
          onClick={() => setShow(!show)}
          style={{
            background: "transparent",
            border: "1px solid gray",
            borderRadius: "0.3rem",
            color: "white",
            cursor: "pointer",
          }}
        >
          Hide menu bar
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
        <ComponentLayout id="starting-layout" hideMenuBar={false}>
          <div style={{ width: "100%", height: "100%", background: "gray" }} />
          <div style={{ width: "100%", height: "100%", background: "blue" }} />
          <div
            style={{ width: "100%", height: "100%", background: "orange" }}
          />

          <div
            style={{ width: "100%", height: "100%", background: "orange" }}
          />
          <div
            style={{ width: "100%", height: "100%", background: "orange" }}
          />
        </ComponentLayout>
      </div>
    </div>
  );
}

export default App;
