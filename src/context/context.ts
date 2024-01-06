import { createContext } from 'react';

import { ShowUpOptions } from '../types';

export const UseShowUpContext = createContext({} as Partial<ShowUpOptions>);
UseShowUpContext.displayName = 'UseShowUpContext';
