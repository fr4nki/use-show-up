import React from 'react';

import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ERRORS } from '../constants';

import { TestComponent, TestProvider } from './fixtures/components';
import { POPUP_ID } from './fixtures/constants';


describe('when UseShowUpProvider testing', () => {
  afterEach(() => {
    cleanup();
  });

  it('should fail if mountPointSelector not found in DOM', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const expectedString = 'Use-show-up: ' + ERRORS.context.mountPointElementNotFound('#container');

    render(
      <TestProvider {...{
        mountPointSelector: '#container',
      }} />,
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(expectedString);

    consoleErrorSpy.mockRestore();
  });

  it('should fail if selectors not set', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const expectedString = 'Use-show-up: ' + ERRORS.context.mountPointUndefined;

    render(
      <TestProvider />,
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(expectedString);

    consoleErrorSpy.mockRestore();
  });

  it('should not print errors if mountPointSelector present', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <TestProvider {...{
        mountPointSelector: '#container',
        elementSelectorId: 'container',
      }} />,
    );

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('should render popup if all necessary props are passed', async () => {
    render(
      <TestProvider {...{
        elementSelectorId: 'pop',
        mountPointSelector: '#pop',
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
