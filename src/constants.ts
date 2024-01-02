import { ShowUpOptions } from './types';

export const SHOW_UP_CONTAINER_CLASS_NAME = 'show-up-container';

export const DEFAULT_SHOW_UP_OPTIONS: ShowUpOptions = {
  closeOnPressEscButton: true,
  closeOnPressOutside: true,
  showOnRender: false,
  focusFirstElementOnRender: false,
  layout: null,
  className: '',
};

export const ERRORS = {
  context: {
    mountPointUndefined: 'MountPointSelector is not defined',
    mountPointElementNotFound: (selector: string) =>
      `Element of mountPointSelector not found. Passed selector: "${selector}"`,
  },
  hook: {
    attemptToCall: 'Attempt to call "useShowUp". Check your <UseShowUpProvider /> - "mountPointSelector" prop invalid',
    callingUnmountedElement: 'You are calling not mounted component',
  },
};

export const FOCUSABLE_SELECTORS = [
  'input',
  'textarea',
  'a',
  'select',
  'button',
  'fieldset',
  'legend',
  'area',
  'button',
  'details',
  'summary',
  'iframe',
  'object',
  'select',
  'textarea',
  'label',
  '[contenteditable]',
  'audio',
  'video',
  'details',
  'summary',
];
