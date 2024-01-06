import React, { FC, PropsWithChildren } from 'react';

import { ShowUpOptions } from '../types';

import { UseShowUpContext } from './context';

export const UseShowUpProvider: FC<PropsWithChildren<Partial<ShowUpOptions>>> = ({
  children,
  ...value
}) => (
  <UseShowUpContext.Provider {...{
    value,
  }}>
    { children }
  </UseShowUpContext.Provider>
);
