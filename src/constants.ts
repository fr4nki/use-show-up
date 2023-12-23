import {PopupOptions} from "./types";

export const DEFAULT_POPUP_OPTIONS: PopupOptions = {
  closeOnPressEscButton: true,
  closeOnPressOutside: true,
  showOnRender: false,
  handleClose: () => {},
  handleShown: () => {},
  layout: null,
};
