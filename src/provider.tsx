import React, { FC, PropsWithChildren } from "react";
import {PopupOptions} from "./types";
import {UsePopupContext} from "./context";
import {DEFAULT_POPUP_OPTIONS} from "./constants";
import {log} from "./helpers";

type MountPoint = {
  mountPointSelector: string;
};

type Props = Partial<PopupOptions> & MountPoint;

export const UsePopupProvider: FC<PropsWithChildren<Props>> = ({
  children,
  mountPointSelector,
  ...rest
}) => {
  if (typeof document === 'undefined') {
    return children;
  }

  if (!mountPointSelector) {
    log(`MountPointSelector is not defined`);
    return children;
  }

  const mountPointElement = document.querySelector(mountPointSelector);

  if (!mountPointElement) {
    log(`Element of mountPointSelector not found. Passed selector: "${mountPointSelector}"`);
    return children;
  }

  const value = {
    ...DEFAULT_POPUP_OPTIONS,
    ...rest,
    mountPointElement,
  };

  return (
    <UsePopupContext.Provider {...{
      value,
    }}>
      { children }
    </UsePopupContext.Provider>
  )
};
