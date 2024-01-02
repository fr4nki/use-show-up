type LoggerType = 'log' | 'error' | 'warn';

export const logger = (type: LoggerType, ...toLog: unknown[]) => {
  console[type]('Use-show-up:', ...toLog);
};
