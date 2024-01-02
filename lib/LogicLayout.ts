import {
  dynamicLayout,
  layoutElement,
  direction,
  IElementContainer,
  positions,
} from "./interfaces";
import { ReactNode } from "react";

export const _version = "2.0.0";

export const getBeforeDirection = (direction: direction) => {
  if (direction.length === 1) {
    return direction;
  }
  return direction.slice(0, direction.length - 1);
};

export const assignDirections = (
  tree: dynamicLayout,
  direction: direction = []
) => {
  tree.forEach((e, i) => {
    const currentdirection = [...direction, i];
    if (!e?.children.length && !e.original) {
      tree.splice(i, 1);
      return;
    }
    if (e?.children.length === 1 && !e.original) {
      tree[i].children[0].direction = currentdirection;
      tree[i] = tree[i].children[0];
      return assignDirections(tree[i].children, currentdirection);
    }
    assignDirections(e.children, currentdirection);
    e.direction = currentdirection;
  });
  return tree;
};

export const navigateThrough = (
  tree: dynamicLayout,
  direction: direction,
  edit?: layoutElement
): layoutElement => {
  const position = direction.shift()!;
  if (!direction.length) {
    tree[position] = edit || tree[position];
    return tree[position];
  }
  return navigateThrough(tree[position].children, direction, edit);
};

export const removeNode = (
  tree: dynamicLayout,
  direction: direction
): layoutElement => {
  if (direction.length === 1) {
    return tree.splice(direction[0], 1)[0];
  }
  const closestParent = navigateThrough(tree, getBeforeDirection(direction));

  return closestParent.children.splice(direction[direction.length - 1], 1)[0];
};

export const switchNode = (
  tree: dynamicLayout,
  node: layoutElement,
  switchNode: layoutElement
) => {
  const directionNode = node.direction;
  const directionSwitch = switchNode.direction;
  const code: string = directionSwitch
    .join("")
    .substring(0, directionNode.length);
  const isChild: boolean = code === directionNode.join("");

  if (isChild) {
    removeNode(tree, directionSwitch);
    switchNode.children.push(node);
    switchNode.direction = [...directionNode];
    navigateThrough(tree, directionSwitch);
    assignDirections(switchNode.children);
  }

  node.direction = [...directionSwitch];
  switchNode.direction = [...directionNode];

  navigateThrough(tree, directionSwitch, node);
  navigateThrough(tree, directionNode, switchNode);
  return tree;
};

export const insertNode = (
  tree: dynamicLayout,
  children: dynamicLayout,
  direction: direction,
  orientation: "horizontal" | "vertical",
  deleteCount = 0
): dynamicLayout => {
  const newId = new Date().getTime();
  const newNode: layoutElement = {
    id: newId,
    key: newId.toString(),
    orientation,
    original: false,
    children: children,
    direction,
  };
  const lastDirection = direction[direction.length - 1];
  if (direction.length === 1) {
    tree.splice(lastDirection, deleteCount, newNode);
    return assignDirections(tree);
  }
  const parentDirection = getBeforeDirection(direction);
  const childrenClosestParent = navigateThrough(tree, [...parentDirection]);

  childrenClosestParent.children.splice(lastDirection, deleteCount, newNode);
  return assignDirections(childrenClosestParent.children, parentDirection);
};

export const moveNodes = (
  tree: dynamicLayout,
  node: layoutElement,
  switchNode: layoutElement,
  position: positions
) => {
  const orientation =
    position === "bottom" || position === "top" ? "vertical" : "horizontal";
  const nodeDirection = [...node.direction];
  insertNode(tree, [node, switchNode], switchNode.direction, orientation, 1);
  removeNode(tree, nodeDirection);
  return assignDirections(tree);
};

export const moveToTheTop = (tree: dynamicLayout, directionNode: direction) => {
  const node = removeNode(tree, directionNode);
  tree.push(node);
  return assignDirections(tree);
};

export const saveLayout = (layout: dynamicLayout, layoutId: string) => {
  localStorage.setItem(layoutId, JSON.stringify(layout));
};

export const convertChildrenToLayout = (
  id: number,
  layoutId: string,
  name?: string | number
): layoutElement => {
  const newObject: layoutElement = {
    id: id,
    key: id.toString() + layoutId,
    orientation: "horizontal",
    children: [],
    direction: [],
    original: true,
    name,
  };

  return newObject;
};

export const convertChildrenToElementContainer = (
  children: ReactNode,
  id: number,
  layoutId: string
): IElementContainer => {
  const newObject: IElementContainer = {
    element: children,
    key: (id * 2).toString(),
    id: id.toString() + layoutId,
    layoutId,
  };
  return newObject;
};
