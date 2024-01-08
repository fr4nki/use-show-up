import React from 'react';

import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RefContainer, TestComponent, TestProvider } from './fixtures/components';
import { POPUP_ID } from './fixtures/constants';


describe('when UseShowUpProvider testing', () => {
  afterEach(() => {
    cleanup();
  });

  it('should not print errors if mountPoint present as string', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <TestProvider {...{
        mountPoint: '#container',
        elementSelectorId: 'container',
      }} />,
    );

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('should not fail if mountPoint present as HTML Element', async () => {
    const el = document.createElement('div');
    el.id = 'container';
    document.body.appendChild(el);

    render(
      <TestProvider {...{
        mountPoint: el,
        elementSelectorId: 'container',
      }}>
        <TestComponent {...{
          mountPopup: true,
        }} />
      </TestProvider>,
    );

    const popupElement = document.getElementById(POPUP_ID);
    expect(popupElement).toBeInTheDocument();
  });

  it('should not fail if mountPoint present as Ref', async () => {
    render(
      <>
        <RefContainer {...{
          containerId: 'refContainer',
        }}>
          {
            (ref) => (
              <TestProvider {...{
                mountPoint: ref,
                elementSelectorId: 'container',
              }}>
                <TestComponent {...{
                  mountPopup: true,
                }} />
              </TestProvider>
            )
          }
        </RefContainer>,
      </>,
    );

    const popupElement = document.getElementById(POPUP_ID);

    expect(popupElement).toBeInTheDocument();
  });

  it('should render popup if all necessary props are passed', async () => {
    render(
      <TestProvider {...{
        elementSelectorId: 'pop',
        mountPoint: '#pop',
      }}>
        <TestComponent {...{
          mountPopup: true,
        }} />
      </TestProvider>,
    );

    const popupElement = document.getElementById(POPUP_ID);

    expect(popupElement).toBeInTheDocument();
  });
});
