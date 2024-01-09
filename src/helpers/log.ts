import { CONSOLE_LOG_PREFIX } from '../constants';

export const logger = (type: 'log' | 'error' | 'warn', toLog: string) => {
  console[type](`${CONSOLE_LOG_PREFIX}${toLog}`);
};
