import TestCounter from "./TestCounter";

const TestCase = ({ show }: { show: boolean }) => {
  return [
    <TestCounter key={"test-countet"}></TestCounter>,
    show && (
      <div
        key={"test1"}
        id="element"
        style={{ width: "100%", height: "100%", background: "#000" }}
      ></div>
    ),

    <div
      key={"test2"}
      id="element"
      style={{ width: "100%", height: "100%", background: "#000" }}
    ></div>,

    <div
      key={"test3"}
      id="element"
      style={{ width: "100%", height: "100%", background: "#000" }}
    ></div>,

    <div
      key={"test4"}
      id="element"
      style={{ width: "100%", height: "100%", background: "#000" }}
    ></div>,

    <div
      key={"test5"}
      id="element"
      style={{ width: "100%", height: "100%", background: "#000" }}
    ></div>,
  ];
};

export default TestCase;
