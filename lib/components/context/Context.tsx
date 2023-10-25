import { createContext } from "react";
import { IContextStore } from "../../interfaces";

const LayoutContext = createContext<IContextStore>({});

export default LayoutContext;
