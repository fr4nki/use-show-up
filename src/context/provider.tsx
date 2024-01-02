import React, { FC, PropsWithChildren } from 'react';

import { DEFAULT_SHOW_UP_OPTIONS, ERRORS } from '../constants';
import { logger } from '../helpers';
import { ShowUpOptions } from '../types';

import { UseShowUpContext } from './context';
import { UseShowUpContextProps } from './types';

type ProviderProps = {
  mountPointSelector: string;
};

type Props = Partial<ShowUpOptions> & ProviderProps;

export const UseShowUpProvider: FC<PropsWithChildren<Props>> = ({
  children,
  mountPointSelector,
  ...rest
}) => {
  if (typeof document === 'undefined') {
    return children;
  }

  if (!mountPointSelector) {
    logger('error', ERRORS.context.mountPointUndefined);
    return children;
  }

  const mountPointElement = document.querySelector(mountPointSelector);

  if (!mountPointElement) {
    logger('error', ERRORS.context.mountPointElementNotFound(mountPointSelector));
    return children;
  }

  const value: UseShowUpContextProps = {
    ...DEFAULT_SHOW_UP_OPTIONS,
    ...rest,
    mountPointElement,
  };

  return (
    <UseShowUpContext.Provider {...{
      value,
    }}>
      { children }
    </UseShowUpContext.Provider>
  );
};
