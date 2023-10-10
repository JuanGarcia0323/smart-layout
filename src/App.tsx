import { ComponentLayout } from "../lib/main";
function App() {
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
          display: "flex",
          gap: 8,
        }}
      >
        <ComponentLayout id="starting-layout">
          <div style={{ width: "100%", height: "100%", background: "black" }} />
          <div style={{ width: "100%", height: "100%", background: "gray" }} />
          <div style={{ width: "100%", height: "100%", background: "white" }} />
          <div style={{ width: "100%", height: "100%", background: "red" }} />
        </ComponentLayout>
      </div>
    </div>
  );
}

export default App;
