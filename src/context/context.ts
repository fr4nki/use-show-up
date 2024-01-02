import { createContext } from 'react';

import { UseShowUpContextProps } from './types';

export const UseShowUpContext = createContext({} as UseShowUpContextProps);
UseShowUpContext.displayName = 'UseShowUpContext';
