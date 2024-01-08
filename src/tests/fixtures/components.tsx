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
  POPUP_BUTTON_HIDE_ID,
  POPUP_BUTTON_SHOW_ID,
  POPUP_BUTTON_TOGGLE_ID,
  POPUP_ID,
  TEST_POPUP_DISPLAY_NAME,
} from './constants';

export const TestPopup: ShowUpComponent<{ name: string }> = ({ name }) => (
  <div id={POPUP_ID}>
    my popup: {name}

    <input type="text" />
  </div>
);
TestPopup.displayName = TEST_POPUP_DISPLAY_NAME;

export const TestPopupWithoutDisplayName: ShowUpComponent<{ name: string }> = ({ name }) => (
  <div id={POPUP_ID}>
    my popup: {name}

    <input type="text" />
  </div>
);

export const TestComponent: FC<{
  mountPopup?: boolean;
  showOnRender?: boolean;
  handleShow?: () => void;
  handleHide?: () => void;
  popupClassName?: string;
  focusFirstElementOnRender?: boolean;
  withoutDisplayName?: boolean;
}> = ({
  mountPopup = true,
  showOnRender = true,
  focusFirstElementOnRender = false,
  handleHide,
  handleShow,
  popupClassName,
  withoutDisplayName = false,
}) => {
  const Popup = withoutDisplayName ? TestPopupWithoutDisplayName : TestPopup;

  const [Element, show, hide, toggle] = useShowUp(Popup, {
    showOnRender,
    handleHide,
    handleShow,
    focusFirstElementOnRender,
    className: popupClassName,
    hideOnPressEscButton: true,
  });

  return (
    <main>
      {
        mountPopup && (
          <Element {...{
            name: 'name',
          }} />
        )
      }

      <button {...{
        id: POPUP_BUTTON_SHOW_ID,
        onClick: show,
      }}>
        show
      </button>

      <button {...{
        id: POPUP_BUTTON_HIDE_ID,
        onClick: hide,
      }}>
        hide
      </button>

      <button {...{
        id: POPUP_BUTTON_TOGGLE_ID,
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

export const RefContainer: FC<{
  containerId: string;
  children: (ref: RefObject<HTMLDivElement>) => ReactElement;
}> = ({ containerId, children }) => {
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
