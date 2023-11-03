import { dynamicLayout } from "../../lib/interfaces";
export const generateArray = (arrayLenght: number) => {
  return Array(arrayLenght)
    .fill(0)
    .map((_, index) => index);
};
export const getRandom = (min: number, max: number): number => {
  const floatRandom = Math.random();
  const difference = max - min;
  const random = Math.round(difference * floatRandom);
  const randomWithinRange = random + min;

  return randomWithinRange;
};

export const layoutExample: dynamicLayout = [
  {
    id: 0,
    key: "0starting-layout",
    orientation: "horizontal",
    parentId: -1,
    name: 1,
  },
  {
    id: 1,
    key: "1starting-layout",
    orientation: "horizontal",
    parentId: -1,
    name: 2,
  },
  {
    id: 2,
    key: "2starting-layout",
    orientation: "horizontal",
    parentId: -1,
    name: 3,
  },
  {
    id: 3,
    key: "3starting-layout",
    orientation: "horizontal",
    parentId: -1,
    name: 4,
  },
  {
    id: 4,
    key: "4starting-layout",
    orientation: "horizontal",
    parentId: -1,
  },
];

export class LocalStorageMock {
  store: { [key: string]: string } = {};
  length: number = 0;
  key: (index: number) => string | null = (e) => {
    if (e) {
      return "";
    }
    return null;
  };

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}
