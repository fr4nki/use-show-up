import { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { UseShowUpContextProps } from '../context';
import { FOCUSABLE_SELECTORS } from '../constants';

interface Props {
  target: HTMLDivElement;
  isShown: boolean;
  hide: () => void;
  showUpOptions: UseShowUpContextProps;
}

const findAndSetFocus = (target: HTMLDivElement, showUpOptions: UseShowUpContextProps) => {
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
  target,
  isShown,
  hide,
  showUpOptions,
}) => {
  const handleEscKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code.toLowerCase() === 'escape' && isShown && showUpOptions.hideOnPressEscButton) {
      hide();
    }
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (!target.contains(e.target as Node) && isShown && showUpOptions.hideOnPressOutside) {
      hide();
    }
  }, []);

  useEffect(() => {
    if (isShown) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keyup', handleEscKeyPress);

        findAndSetFocus(target, showUpOptions);
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
    !target ||
    !isShown
  ) {
    return null;
  }

  return createPortal(children, target, new Date().toString());
};
