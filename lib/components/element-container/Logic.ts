import { useLayoutEffect, useRef } from "react";
import { IElementContainer } from "../../interfaces";

const Logic = ({ id }: IElementContainer) => {
  const ref = useRef<HTMLDivElement>();
  useLayoutEffect(() => {
    const move = () => {
      const element = document.getElementById(id);
      const grid = document.getElementById("parent-grid");
      const currentElement = ref.current;
      if (!element || !currentElement || !grid) {
        return;
      }
      const { x: xGrid, y: yGrid } = grid.getBoundingClientRect();
      const { clientHeight, clientWidth } = element;
      const { x: xElement, y: yElement } = element.getBoundingClientRect();
      const realX = Math.round(xElement - xGrid);
      const realY = Math.round(yElement - yGrid);

      currentElement.style.transform = `translateY(${realY}px) translateX(${realX}px)`;
      currentElement.style.width = `${clientWidth}px`;
      currentElement.style.height = `${clientHeight}px`;
    };
    move();
    addEventListener("resize", move);
    return () => removeEventListener("resize", move);
  });

  return { ref };
};

export default Logic;
