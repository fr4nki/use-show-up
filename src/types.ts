import {ComponentType, ReactNode} from "react";

export type Popup<T = object> = ComponentType<T & PopupInternalMethods>;

export type PopupInternalMethods = {
  close: () => void;
};

export type PopupLayout = ComponentType<{
  close: () => void;
  children: ReactNode;
}>;

export type PopupOptions = {
  closeOnPressEscButton: boolean;
  closeOnPressOutside: boolean;
  showOnRender: boolean;
  handleClose: () => void;
  handleShown: () => void;
  layout?: PopupLayout | null;
};

