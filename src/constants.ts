import { ShowUpOptions } from './types';

export const SHOW_UP_POPUP_CLASS_NAME = 'show-up-component';

export const DEFAULT_SHOW_UP_OPTIONS: ShowUpOptions = {
  hideOnPressEscButton: true,
  hideOnPressOutside: true,
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
  'select',
  'textarea',
  '[contenteditable]',
  'audio',
  'video',
  'details',
  'summary',
  'label',
];
