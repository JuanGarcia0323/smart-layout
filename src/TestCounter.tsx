import { useState } from "react";
const TestCounter = ({ showDescription }: { showDescription?: boolean }) => {
  const [counter, setCounter] = useState(0);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={() => setCounter(counter + 1)} id="button-test-counter">
        {counter}
      </button>
      {showDescription && (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos minus
          nesciunt enim corporis exercitationem atque optio fugit quidem sequi,
          ratione eius voluptatum cum aut, repudiandae eum illum perferendis ex
          necessitatibus! {}
        </p>
      )}
    </div>
  );
};

export default TestCounter;
