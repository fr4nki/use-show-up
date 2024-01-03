type LoggerType = 'log' | 'error' | 'warn';

export const logger = (type: LoggerType, toLog: string) => {
  console[type](`Use-show-up: ${toLog}`);
};
