import React from 'react';

import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TestContainerWithRef, TestComponent, TestProvider } from './fixtures/components';
import { TEST_ELEMENT_ID } from './fixtures/constants';

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
          mountElement: true,
        }} />
      </TestProvider>,
    );

    const element = document.getElementById(TEST_ELEMENT_ID);
    expect(element).toBeInTheDocument();
  });

  it('should not fail if mountPoint present as Ref', async () => {
    render(
      <>
        <TestContainerWithRef {...{
          containerId: 'refContainer',
        }}>
          {
            (ref) => (
              <TestProvider {...{
                mountPoint: ref,
                elementSelectorId: 'container',
              }}>
                <TestComponent {...{
                  mountElement: true,
                }} />
              </TestProvider>
            )
          }
        </TestContainerWithRef>,
      </>,
    );

    const element = document.getElementById(TEST_ELEMENT_ID);

    expect(element).toBeInTheDocument();
  });

  it('should render element if all necessary props are passed', async () => {
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
  });
});
