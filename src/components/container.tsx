import { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { UseShowUpContextProps } from '../context';
import { FOCUSABLE_SELECTORS } from '../constants';

interface Props {
  target: HTMLDivElement;
  shown: boolean;
  close: () => void;
  options: UseShowUpContextProps;
}

const findAndSetFocus = (target: HTMLDivElement, options: UseShowUpContextProps) => {
  let found = false;

  if (!options.focusFirstElementOnRender) {
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
  shown,
  close,
  options,
}) => {
  const handleEscKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code.toLowerCase() === 'escape' && shown && options.closeOnPressEscButton) {
      close();
    }
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (!target.contains(e.target as Node) && shown && options.closeOnPressOutside) {
      close();
    }
  }, []);

  useEffect(() => {
    if (shown) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keyup', handleEscKeyPress);
      }, 0);

      findAndSetFocus(target, options);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keyup', handleEscKeyPress);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keyup', handleEscKeyPress);
    };
  }, [shown]);

  if (typeof document === 'undefined') {
    return null;
  }

  if (!target) {
    return null;
  }

  if (!shown) {
    return null;
  }

  return createPortal(children, target, new Date().toString());
};
