import { expect } from "@jest/globals";
import {
  switchElement,
  reorganizeItems,
  convertChildrenToLayout,
  moveElement,
  balance,
  saveLayout,
  convertChildrenToElementContainer,
} from "../lib/LogicLayout";
import {
  IElementContainer,
  direction,
  dynamicLayout,
  layoutElement,
  orientation,
} from "../lib/interfaces";
import { getRandom, generateArray, LocalStorageMock } from "./utils/utils";
global.localStorage = new LocalStorageMock();

test("switch elements", () => {
  const layout: dynamicLayout = generateArray(10).map((e) =>
    convertChildrenToLayout(e, "test")
  );
  const selectedElementIndex: number = getRandom(1, layout.length - 1);
  const firstElement: layoutElement = { ...layout[0] };
  const elementToSwitch: layoutElement = {
    ...layout[selectedElementIndex],
  };
  const switchedLayout = switchElement(layout, firstElement, elementToSwitch);
  expect(switchedLayout[0].id).toBe(elementToSwitch.id);
  expect(switchedLayout[selectedElementIndex].id).toBe(firstElement.id);
});

test("switch element with id === parentId", () => {
  const layout: dynamicLayout = generateArray(10).map((e) =>
    convertChildrenToLayout(e, "test")
  );
  const selectedElementIndex: number = getRandom(1, layout.length - 1);
  const firstElement: layoutElement = { ...layout[0] };
  const elementToSwitch: layoutElement = {
    ...layout[selectedElementIndex],
    parentId: firstElement.id,
  };
  const switchedLayout = switchElement(layout, firstElement, elementToSwitch);
  expect(layout).toEqual(switchedLayout);
});

test("reorganize items", () => {
  const layout: dynamicLayout = generateArray(10).map((e) =>
    convertChildrenToLayout(e, "test")
  );
  const orientation: orientation[] = ["horizontal", "vertical"];
  const selectedOrientation: orientation = orientation[getRandom(0, 1)];
  const selectedElementIndex: number = getRandom(1, layout.length - 1);
  const { id: firstElementId, parentId } = { ...layout[0] };
  const selectedElementId: number = layout[selectedElementIndex].id;
  const newLayout = reorganizeItems(
    layout,
    layout[0],
    layout[selectedElementIndex],
    -1,
    1,
    selectedOrientation
  );
  const firstElement = newLayout.find((e) => e.id === firstElementId);
  const selectedElemet = newLayout.find((e) => e.id === selectedElementId);
  const newElement = newLayout.find((e) => e.id === selectedElemet?.parentId);

  expect(layout.length + 1).toBe(newLayout.length);
  expect(firstElement?.parentId).toBe(selectedElemet?.parentId);
  expect(newElement?.parentId).toBe(parentId);
  expect(newElement?.orientation).toBe(selectedOrientation);
});

test("move element", () => {
  const layout: dynamicLayout = generateArray(10).map((e) =>
    convertChildrenToLayout(e, "test")
  );
  const direction: direction[] = ["bottom", "top", "left", "right"];

  const selectedDirection: direction =
    direction[getRandom(0, direction.length - 1)];
  const expectedOrientation: orientation =
    selectedDirection === "right" || selectedDirection === "left"
      ? "horizontal"
      : "vertical";
  const selectedElementIndex: number = getRandom(1, layout.length - 1);
  const firstElement = { ...layout[0] };
  const selectedElement = { ...layout[selectedElementIndex] };
  const newLayout = moveElement(
    layout,
    firstElement,
    selectedElement,
    selectedDirection
  );
  // const firstElementMoved = newLayout.find((e) => e.id === firstElement.id);
  const selectedElementMoved = newLayout.find(
    (e) => e.id === selectedElement.id
  );
  const newElement = newLayout.find(
    (e) => e.id === selectedElementMoved?.parentId
  );

  expect(newLayout.length).toBe(layout.length + 1);
  expect(newElement?.id).toBe(newLayout[selectedElementIndex].id);
  expect(newElement?.orientation).toBe(expectedOrientation);
});

test("move elements with id === parentId", () => {
  const layout: dynamicLayout = generateArray(10).map((e) =>
    convertChildrenToLayout(e, "test")
  );
  const selectedElementIndex: number = getRandom(1, layout.length - 1);
  const firstElement: layoutElement = { ...layout[0] };
  const elementToSwitch: layoutElement = {
    ...layout[selectedElementIndex],
    parentId: firstElement.id,
  };
  const switchedLayout = moveElement(
    layout,
    firstElement,
    elementToSwitch,
    "bottom"
  );
  expect(layout).toEqual(switchedLayout);
});

test("move element into reorganized container", () => {
  const layout: dynamicLayout = generateArray(10).map((e) =>
    convertChildrenToLayout(e, "test")
  );
  const firstElement = { ...layout[0] };
  const selectedElementIndex: number = getRandom(1, layout.length - 1);
  const selectedElement = { ...layout[selectedElementIndex] };
  const newLayout = moveElement(
    layout,
    layout[0],
    layout[selectedElementIndex],
    "top"
  );
  const selectedElementAfterMove = newLayout.find(
    (e) => e.id === selectedElement.id
  );
  const newElement = newLayout.find(
    (e) => e.id === selectedElementAfterMove?.parentId
  );
  const newSelectedElement = newLayout.find(
    (e) =>
      e.id !== newElement?.id &&
      e.id !== selectedElementAfterMove?.id &&
      e.id !== firstElement.id
  );
  expect(newElement).toBeTruthy();
  const newLayoutWithAnotherMove = moveElement(
    newLayout,
    newSelectedElement!,
    selectedElementAfterMove!,
    "bottom"
  );
  const reorganizedContainerChildren = newLayoutWithAnotherMove.filter(
    (e) => e.parentId === newElement?.id
  );
  const indexChildrenFirstSelectedElement =
    reorganizedContainerChildren.findIndex(
      (e) => e.id === selectedElementAfterMove?.id
    );
  const indexChildrenSecondSelectedElement =
    reorganizedContainerChildren.findIndex(
      (e) => e.id === newSelectedElement?.id
    );
  expect(newLayoutWithAnotherMove.length).toBe(layout.length + 1);
  expect(reorganizedContainerChildren.length).toBe(3);
  expect(indexChildrenFirstSelectedElement).toBe(
    indexChildrenSecondSelectedElement - 1
  );
});

test("balance layout", () => {
  const layout: dynamicLayout = generateArray(10).map((e) =>
    convertChildrenToLayout(e, "test")
  );
  const newLayout = moveElement(layout, layout[0], layout[1], "top");
  const movedChidlren = newLayout.find((e) => e.parentId !== -1)!;
  movedChidlren.parentId = -1;
  const balancedLayout = balance(newLayout);
  expect(newLayout.length).toBe(layout.length + 1);
  expect(balancedLayout.length).toBe(layout.length);
});

test("save layout on local-storage", () => {
  const layout: dynamicLayout = generateArray(10).map((e) =>
    convertChildrenToLayout(e, "test")
  );
  const layoutId = "test-layout-jest";
  localStorage.removeItem(layoutId);
  expect(localStorage.getItem(layoutId)).toBeFalsy();
  saveLayout(layout, layoutId);
  expect(localStorage.getItem(layoutId));
});

test("Convert children to element container", () => {
  const childrens = generateArray(10);
  const elements: IElementContainer[] = childrens.map((e) =>
    convertChildrenToElementContainer(e, e, "test")
  );
  const allProperties = elements.every((e) => e.id && e.key && e.layoutId);
  expect(elements.length).toBe(childrens.length);
  expect(allProperties).toBeTruthy();
});
