import {
  createElement,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ShowUpComponent, ShowUpOptions, ShowUpElement } from '../types';
import { UseShowUpContext, UseShowUpContextProps } from '../context';
import { UseShowUpContainer, UseShowUpLayout } from '../components';
import { logger } from '../helpers';
import { ERRORS, SHOW_UP_POPUP_CLASS_NAME } from '../constants';

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
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isShown, setIsShown] = useState(false);

  const showUpOptions: UseShowUpContextProps = {
    ...context,
    ...options,
  };

  const show = () => {
    if (!isShown) {
      setIsShown(true);
      showUpOptions?.handleShow?.();
    }
  };
  const hide = () => {
    if (isShown) {
      setIsShown(false);
      showUpOptions?.handleHide?.();
    }
  };
  const toggle = () => {
    if (isShown) {
      hide();
    } else {
      show();
    }
  };

  const Component = (props: T) => {
    if (!showUpOptions.mountPointElement || !targetRef.current) {
      return createElement(Fragment);
    }

    return (
      createElement(
        UseShowUpContainer, { isShown, hide, showUpOptions, target: targetRef.current },
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
    if (showUpOptions.mountPointElement) {
      const target = document.createElement('div');

      const classList = [
        SHOW_UP_POPUP_CLASS_NAME,
        component.displayName ? `${SHOW_UP_POPUP_CLASS_NAME}-${component.displayName}` : '',
        showUpOptions.className ?? '',
      ].filter((s) => !!s);

      target.classList.add(...classList);
      targetRef.current = target;

      showUpOptions.mountPointElement.appendChild(target);

      if (showUpOptions.showOnRender) {
        show();
      }
    } else {
      logger('error', ERRORS.hook.attemptToCall);
    }

    return () => {
      targetRef.current?.remove();
    };
  }, []);

  return [Component, show, hide, toggle];
};
