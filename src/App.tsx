import { ComponentLayout } from "../lib/main";
function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ComponentLayout>
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "orange" }}
        ></div>
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "green" }}
        ></div>

        <div
          style={{ width: "100%", height: "100%", backgroundColor: "aqua" }}
        ></div>
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "red" }}
        ></div>
      </ComponentLayout>
    </div>
  );
}

export default App;
