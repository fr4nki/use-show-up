import {
  createElement,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ShowUpComponent, ShowUpElement, ShowUpOptions } from '../types';
import { UseShowUpContext } from '../context';
import { UseShowUpContainer, UseShowUpLayout } from '../components';
import { logger } from '../helpers';
import { DEFAULT_SHOW_UP_OPTIONS, ERRORS, SHOW_UP_POPUP_CLASS_NAME } from '../constants';

const getMountPointElement = (mountPoint: ShowUpOptions['mountPoint']): Element | null => {
  if (typeof mountPoint === 'string') {
    return document.querySelector(mountPoint);
  }

  if ('current' in mountPoint && mountPoint.current instanceof HTMLElement) {
    return mountPoint.current;
  }

  return mountPoint instanceof HTMLElement ? mountPoint : null;
};

export const useShowUp = <T = object>(
  component: ShowUpComponent<T>,
  options?: Partial<ShowUpOptions>,
): [
  ShowUpElement<T>,
  () => void,
  () => void,
  () => void,
] => {
  const context = useContext(UseShowUpContext);
  const showUpElementRef = useRef<HTMLDivElement | null>(null);
  const [isShown, setIsShown] = useState(false);

  const showUpOptions: ShowUpOptions = {
    ...DEFAULT_SHOW_UP_OPTIONS,
    ...context,
    ...options,
  };

  const show = useCallback(() => {
    if (!isShown) {
      setIsShown(true);
      showUpOptions?.handleShow?.();
    }
  }, [isShown, showUpOptions?.handleShow]);

  const hide = useCallback(() => {
    if (isShown) {
      setIsShown(false);
      showUpOptions?.handleHide?.();
    }
  }, [isShown, showUpOptions?.handleHide]);

  const toggle = useCallback(() => {
    if (isShown) {
      hide();
    } else {
      show();
    }
  }, [isShown]);

  const Component = (props: T) => {
    if (!showUpOptions.mountPoint || !showUpElementRef.current) {
      return createElement(Fragment);
    }

    return (
      createElement(
        UseShowUpContainer, { isShown, hide, showUpOptions, showUpElement: showUpElementRef.current },
        createElement(
          showUpOptions.layout ?? UseShowUpLayout, { hide },
          createElement(
            component, { hide, ...props },
          ),
        ),
      )
    );
  };

  useEffect(() => {
    if (showUpOptions.mountPoint) {
      const target = getMountPointElement(showUpOptions.mountPoint);

      if (!target) {
        logger('error', ERRORS.hook.targetNotFound);
        return;
      }

      const showUpElement = document.createElement('div');

      const classList = [
        SHOW_UP_POPUP_CLASS_NAME,
        component.displayName ? `${SHOW_UP_POPUP_CLASS_NAME}-${component.displayName}` : '',
        showUpOptions.className ?? '',
      ].filter((s) => !!s);

      showUpElement.classList.add(...classList);
      showUpElementRef.current = showUpElement;

      target.appendChild(showUpElement);

      if (showUpOptions.showOnRender) {
        show();
      }
    } else {
      logger('error', ERRORS.hook.attemptToCall);
    }

    return () => {
      showUpElementRef.current?.remove();
    };
  }, []);

  return [Component, show, hide, toggle];
};
