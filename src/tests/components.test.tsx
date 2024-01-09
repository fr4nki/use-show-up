import React from 'react';

import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TestComponent, TestProvider } from './fixtures/components';
import { TEST_ELEMENT_ID } from './fixtures/constants';

describe('when Components like container and layout in test', () => {
  afterEach(() => {
    cleanup();
  });

  test('should call hide() when Escape key is pressed', async () => {
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

    const element = document.getElementById(TEST_ELEMENT_ID);
    expect(element).toBeInTheDocument();

    await act(async () => {
      setTimeout(() => {
        fireEvent.keyUp(document, { key: 'Escape', code: 'Escape' });
      }, 0);
    });

    await waitFor(() => {
      const hiddenElement = document.getElementById(TEST_ELEMENT_ID);
      expect(hiddenElement).not.toBeInTheDocument();
    });
  });
});
