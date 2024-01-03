import React from 'react';

import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TestComponent, TestProvider } from './fixtures/components';
import { POPUP_ID } from './fixtures/constants';

describe('when Components like container and layout in test', () => {
  afterEach(() => {
    cleanup();
  });

  test('should call hide() when Escape key is pressed', async () => {
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

    const popup = document.getElementById(POPUP_ID);
    expect(popup).toBeInTheDocument();

    await act(async () => {
      setTimeout(() => {
        fireEvent.keyUp(document, { key: 'Escape', code: 'Escape' });
      }, 0);
    });

    await waitFor(() => {
      const hiddenPopup = document.getElementById(POPUP_ID);
      expect(hiddenPopup).not.toBeInTheDocument();
    });
  });
});
