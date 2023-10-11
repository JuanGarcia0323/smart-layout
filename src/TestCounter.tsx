import { useState } from "react";
const TestCounter = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={() => setCounter(counter + 1)}>
        Click me {counter}
      </button>
    </div>
  );
};

export default TestCounter;
