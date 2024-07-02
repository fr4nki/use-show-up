import { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ShowUpOptions } from '../types';
import { FOCUSABLE_SELECTORS } from '../constants';

interface Props {
  showUpElement: HTMLDivElement;
  isShown: boolean;
  hide: () => void;
  showUpOptions: ShowUpOptions;
}

const findAndSetFocus = (target: HTMLDivElement, showUpOptions: ShowUpOptions) => {
  let found = false;

  if (!showUpOptions.focusFirstElementOnRender) {
    return;
  }

  FOCUSABLE_SELECTORS.forEach((selector) => {
    const el = target.querySelector(selector) as HTMLElement;

    if (!found) {
      el?.focus();
      found = true;
    }
  });
};

export const UseShowUpContainer: FC<PropsWithChildren<Props>> = ({
  children,
  showUpElement,
  isShown,
  hide,
  showUpOptions,
}) => {
  const handleEscKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code && e.code.toLowerCase() === 'escape' && isShown && showUpOptions.hideOnPressEscButton) {
      hide();
    }
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (!showUpElement.contains(e.target as Node) && isShown && showUpOptions.hideOnPressOutside) {
      hide();
    }
  }, []);

  useEffect(() => {
    if (isShown) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keyup', handleEscKeyPress);

        findAndSetFocus(showUpElement, showUpOptions);
      }, 0);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keyup', handleEscKeyPress);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keyup', handleEscKeyPress);
    };
  }, [isShown]);

  if (
    typeof document === 'undefined' ||
    !showUpElement ||
    !isShown
  ) {
    return null;
  }

  return createPortal(children, showUpElement, new Date().toString());
};
