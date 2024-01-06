import React from 'react';

import { act, cleanup, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ERRORS, SHOW_UP_POPUP_CLASS_NAME } from '../constants';

import { TestComponent, TestProvider } from './fixtures/components';
import { POPUP_BUTTON_HIDE_ID, POPUP_BUTTON_TOGGLE_ID, POPUP_ID, TEST_POPUP_DISPLAY_NAME } from './fixtures/constants';

describe('when UseShowUp hook is in testing', () => {
  afterEach(() => {
    cleanup();
  });

  it('should print error if hook called without mountPoint', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const expectedString = 'Use-show-up: ' + ERRORS.hook.attemptToCall;

    render(
      <TestProvider>
        <TestComponent />
      </TestProvider>,
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(expectedString);

    consoleErrorSpy.mockRestore();
  });

  it('should hiding correctly by calling Hide function from hook', async () => {
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

    await waitFor(() => {
      const popupElement = document.getElementById(POPUP_ID);
      expect(popupElement).toBeInTheDocument();
    });

    await waitFor(() => {
      const popupElement = document.getElementById(POPUP_ID);
      const buttonHide = document.getElementById(POPUP_BUTTON_HIDE_ID);
      buttonHide?.click();
      expect(popupElement).not.toBeInTheDocument();
    });
  });

  it('should works well by calling Toggle function from hook', async () => {
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

    await waitFor(() => {
      const popupElement = document.getElementById(POPUP_ID);
      expect(popupElement).toBeInTheDocument();
    });

    await waitFor(() => {
      const popupElement = document.getElementById(POPUP_ID);
      const buttonToggle = document.getElementById(POPUP_BUTTON_TOGGLE_ID);
      buttonToggle?.click();
      expect(popupElement).not.toBeInTheDocument();
    });

    await waitFor(() => {
      const popupElement = document.getElementById(POPUP_ID);
      const buttonToggle = document.getElementById(POPUP_BUTTON_TOGGLE_ID);
      buttonToggle?.click();
      expect(popupElement).toBeInTheDocument();
    });
  });

  it('should apply addition classes for popup', async () => {
    const popupClassName = 'my-popup-class-name';

    render(
      <TestProvider {...{
        elementSelectorId: 'pop',
        mountPoint: '#pop',
      }}>
        <TestComponent {...{
          mountPopup: true,
          popupClassName,
        }} />
      </TestProvider>,
    );

    const popupElements = document.querySelectorAll(`.${SHOW_UP_POPUP_CLASS_NAME}`);
    const target = Array.from(popupElements).slice(-1)[0];

    expect(target).toHaveClass(popupClassName);
    expect(target).toHaveClass(`${SHOW_UP_POPUP_CLASS_NAME}-${TEST_POPUP_DISPLAY_NAME}`);
  });

  it('should work as expected without passed extra classes', async () => {
    render(
      <TestProvider {...{
        elementSelectorId: 'pop',
        mountPoint: '#pop',
      }}>
        <TestComponent {...{
          mountPopup: true,
          withoutDisplayName: true,
        }} />
      </TestProvider>,
    );

    const popupElements = document.querySelectorAll(`.${SHOW_UP_POPUP_CLASS_NAME}`);
    const target = Array.from(popupElements).slice(-1)[0];

    expect(target.classList.length).toBe(1);
  });

  it('should print error if mountPoint not found', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const expectedString = 'Use-show-up: ' + ERRORS.hook.targetNotFound;

    render(
      <TestProvider {...{
        elementSelectorId: 'pop',
        mountPoint: '#pop1',
      }}>
        <TestComponent {...{
          mountPopup: true,
          withoutDisplayName: true,
        }} />
      </TestProvider>,
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(expectedString);

    consoleErrorSpy.mockRestore();
  });


  // TODO: Rewrite these two tests. Jest telling me, handleShow and handleHide still uncovered
  it('handleShow should fire', async () => {
    const handleShow = jest.fn();

    render(
      <TestProvider {...{
        elementSelectorId: 'pop',
        mountPoint: '#pop',
      }}>
        <TestComponent {...{
          mountPopup: true,
          handleShow,
        }} />
      </TestProvider>,
    );

    expect(handleShow).toHaveBeenCalled();
  });

  it('handleHide should fire', async () => {
    const handleHide = jest.fn();

    render(
      <TestProvider {...{
        elementSelectorId: 'pop',
        mountPoint: '#pop',
      }}>
        <TestComponent {...{
          mountPopup: true,
          handleHide,
        }} />
      </TestProvider>,
    );

    await act(() => {
      const btn = document.getElementById(POPUP_BUTTON_HIDE_ID);
      btn?.click();
    });

    expect(handleHide).toHaveBeenCalled();
  });
});
