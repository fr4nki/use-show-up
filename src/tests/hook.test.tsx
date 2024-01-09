import React from 'react';

import { act, cleanup, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CONSOLE_LOG_PREFIX, ERRORS, SHOW_UP_ELEMENT_CLASS_NAME } from '../constants';

import { TestComponent, TestProvider } from './fixtures/components';
import {
  TEST_ELEMENT_BUTTON_HIDE_ID,
  TEST_ELEMENT_BUTTON_TOGGLE_ID,
  TEST_ELEMENT_ID,
  TEST_ELEMENT_DISPLAY_NAME,
} from './fixtures/constants';

describe('when UseShowUp hook is in testing', () => {
  afterEach(() => {
    cleanup();
  });

  it('should print error if hook called without mountPoint', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const expectedString = CONSOLE_LOG_PREFIX + ERRORS.hook.attemptToCall;

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
          mountElement: true,
        }} />
      </TestProvider>,
    );

    await waitFor(() => {
      const element = document.getElementById(TEST_ELEMENT_ID);
      expect(element).toBeInTheDocument();
    });

    await waitFor(() => {
      const element = document.getElementById(TEST_ELEMENT_ID);
      const buttonElementHide = document.getElementById(TEST_ELEMENT_BUTTON_HIDE_ID);

      buttonElementHide?.click();

      expect(element).not.toBeInTheDocument();
    });
  });

  it('should works well by calling Toggle function from hook', async () => {
    render(
      <TestProvider {...{
        elementSelectorId: 'pop',
        mountPoint: '#pop',
      }}>
        <TestComponent {...{
          mountElement: true,
        }} />
      </TestProvider>,
    );

    await waitFor(() => {
      const element = document.getElementById(TEST_ELEMENT_ID);
      expect(element).toBeInTheDocument();
    });

    await waitFor(() => {
      const element = document.getElementById(TEST_ELEMENT_ID);
      const buttonElementVisibilityToggle = document.getElementById(TEST_ELEMENT_BUTTON_TOGGLE_ID);

      buttonElementVisibilityToggle?.click();

      expect(element).not.toBeInTheDocument();
    });

    await waitFor(() => {
      const element = document.getElementById(TEST_ELEMENT_ID);
      const buttonElementVisibilityToggle = document.getElementById(TEST_ELEMENT_BUTTON_TOGGLE_ID);

      buttonElementVisibilityToggle?.click();

      expect(element).toBeInTheDocument();
    });
  });

  it('should apply addition classes for element', async () => {
    const elementClassName = 'my-element-class-name';

    render(
      <TestProvider {...{
        elementSelectorId: 'pop',
        mountPoint: '#pop',
      }}>
        <TestComponent {...{
          mountElement: true,
          elementClassName,
        }} />
      </TestProvider>,
    );

    const element = document.querySelectorAll(`.${SHOW_UP_ELEMENT_CLASS_NAME}`);
    const target = Array.from(element).slice(-1)[0];

    expect(target).toHaveClass(elementClassName);
    expect(target).toHaveClass(`${SHOW_UP_ELEMENT_CLASS_NAME}-${TEST_ELEMENT_DISPLAY_NAME}`);
  });

  it('should work as expected without passed extra classes', async () => {
    render(
      <TestProvider {...{
        elementSelectorId: 'pop',
        mountPoint: '#pop',
      }}>
        <TestComponent {...{
          mountElement: true,
          withoutDisplayName: true,
        }} />
      </TestProvider>,
    );

    const elements = document.querySelectorAll(`.${SHOW_UP_ELEMENT_CLASS_NAME}`);
    const target = Array.from(elements).slice(-1)[0];

    expect(target.classList.length).toBe(1);
  });

  it('should print error if mountPoint not found', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const expectedString = CONSOLE_LOG_PREFIX + ERRORS.hook.targetNotFound;

    render(
      <TestProvider {...{
        elementSelectorId: 'pop',
        mountPoint: '#pop1',
      }}>
        <TestComponent {...{
          mountElement: true,
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
          mountElement: true,
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
          mountElement: true,
          handleHide,
        }} />
      </TestProvider>,
    );

    await act(() => {
      const btn = document.getElementById(TEST_ELEMENT_BUTTON_HIDE_ID);
      btn?.click();
    });

    expect(handleHide).toHaveBeenCalled();
  });
});
