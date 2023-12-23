import {createContext} from "react";
import {PopupOptions} from "./types";

type UsePopupContextProps = PopupOptions & {
  mountPointElement: Element;
}

export const UsePopupContext = createContext({} as UsePopupContextProps);
UsePopupContext.displayName = 'UsePopupContext';
