import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  RefObject,
  useRef,
} from 'react';

import { ShowUpComponent } from '../../types';
import { useShowUp } from '../../hooks';
import { UseShowUpProvider } from '../../context';

import {
  TEST_ELEMENT_BUTTON_HIDE_ID,
  TEST_ELEMENT_BUTTON_SHOW_ID,
  TEST_ELEMENT_BUTTON_TOGGLE_ID,
  TEST_ELEMENT_ID,
  TEST_ELEMENT_DISPLAY_NAME,
} from './constants';

const ElInternal: FC<{ name: string }> = ({ name }) => (
  <div id={TEST_ELEMENT_ID}>
    my element is "{name}"

    <input type="text" />
  </div>
);

export const TestElementWithDisplayName: ShowUpComponent<{ name: string }> = ({ name }) => (
  <ElInternal {...{
    name,
  }} />
);
TestElementWithDisplayName.displayName = TEST_ELEMENT_DISPLAY_NAME;

export const TestElementWithoutDisplayName: ShowUpComponent<{ name: string }> = ({ name }) => (
  <ElInternal {...{
    name,
  }} />
);

export const TestComponent: FC<{
  mountElement?: boolean;
  showOnRender?: boolean;
  handleShow?: () => void;
  handleHide?: () => void;
  elementClassName?: string;
  focusFirstElementOnRender?: boolean;
  withoutDisplayName?: boolean;
}> = ({
  mountElement = true,
  showOnRender = true,
  focusFirstElementOnRender = false,
  handleHide,
  handleShow,
  elementClassName,
  withoutDisplayName = false,
}) => {
  const Component = withoutDisplayName ? TestElementWithoutDisplayName : TestElementWithDisplayName;

  const [Element, show, hide, toggle] = useShowUp(Component, {
    showOnRender,
    handleHide,
    handleShow,
    focusFirstElementOnRender,
    className: elementClassName,
    hideOnPressEscButton: true,
  });

  return (
    <main>
      {
        mountElement && (
          <Element {...{
            name: 'name',
          }} />
        )
      }

      <button {...{
        id: TEST_ELEMENT_BUTTON_SHOW_ID,
        onClick: show,
      }}>
        show
      </button>

      <button {...{
        id: TEST_ELEMENT_BUTTON_HIDE_ID,
        onClick: hide,
      }}>
        hide
      </button>

      <button {...{
        id: TEST_ELEMENT_BUTTON_TOGGLE_ID,
        onClick: toggle,
      }}>
        toggle
      </button>
    </main>
  );
};

export const TestProvider: FC<PropsWithChildren<{
  elementSelectorId?: string;
  mountPoint?: string | HTMLElement | RefObject<HTMLElement>;
}>> = ({
  elementSelectorId,
  mountPoint,
  children,
}) => {
  if (elementSelectorId) {
    const element = document.createElement('div');
    element.id = elementSelectorId;
    document.body.appendChild(element);
  }

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <UseShowUpProvider {...{
        hideOnPressEscButton: true,
        mountPoint,
      }}>
        <div>
          { children }
        </div>
      </UseShowUpProvider>
    </>
  );
};

export const TestContainerWithRef: FC<{
  containerId: string;
  children: (ref: RefObject<HTMLDivElement>) => ReactElement;
}> = ({
  containerId,
  children,
}) => {
  const containerRef = useRef(null);

  return (
    <div {...{
      id: containerId,
    }}>
      <div {...{
        ref: containerRef,
      }} />

      { children(containerRef) }
    </div>
  );
};
