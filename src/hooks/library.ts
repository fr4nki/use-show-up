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
import { ERRORS, SHOW_UP_CONTAINER_CLASS_NAME } from '../constants';

const generateComponent = <T = object>(
  component: ShowUpComponent<T>,
  shown: boolean,
  options: UseShowUpContextProps,
  target: HTMLDivElement | null,
  close: () => void,
) => (props: T) => {
  if (!options.mountPointElement || !target) {
    return createElement(Fragment);
  }

  return (
    createElement(
      UseShowUpContainer,
      { shown, close, options, target },
      createElement(
        options.layout ?? UseShowUpLayout,
        { close },
        createElement(
          component,
          { ...props, close },
        ),
      ),
    )
  );
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
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isShown, setIsShown] = useState(false);

  const currentShowUpOptions: UseShowUpContextProps = {
    ...context,
    ...options,
  };

  const show = () => {
    if (!context.mountPointElement) {
      logger('warn', ERRORS.hook.callingUnmountedElement);
    }

    if (!isShown) {
      setIsShown(true);
      currentShowUpOptions?.handleShow?.();
    }
  };
  const hide = () => {
    if (!context.mountPointElement) {
      logger('warn', ERRORS.hook.callingUnmountedElement);
    }

    if (isShown) {
      setIsShown(false);
      currentShowUpOptions?.handleHide?.();
    }
  };
  const toggle = () => {
    if (!context.mountPointElement) {
      logger('warn', ERRORS.hook.callingUnmountedElement);
    }

    if (isShown) {
      hide();
    } else {
      show();
    }
  };

  useEffect(() => {
    if (currentShowUpOptions.mountPointElement) {
      const target = document.createElement('div');

      const classList = [
        SHOW_UP_CONTAINER_CLASS_NAME,
        component.displayName ? `${SHOW_UP_CONTAINER_CLASS_NAME}-${component.displayName}` : '',
        currentShowUpOptions.className ?? '',
      ].filter((s) => !!s);

      target.classList.add(...classList);
      targetRef.current = target;

      currentShowUpOptions.mountPointElement.appendChild(target);

      if (currentShowUpOptions.showOnRender) {
        show();
      }
    } else {
      logger('error', ERRORS.hook.attemptToCall);
    }
  }, []);

  const Component = generateComponent(
    component,
    isShown,
    currentShowUpOptions,
    targetRef.current,
    hide,
  );

  return [Component, show, hide, toggle];
};
