import { ShowUpOptions } from './types';

export const SHOW_UP_POPUP_CLASS_NAME = 'show-up-component';

export const DEFAULT_SHOW_UP_OPTIONS: ShowUpOptions = {
  mountPoint: '',
  hideOnPressEscButton: true,
  hideOnPressOutside: true,
  showOnRender: false,
  focusFirstElementOnRender: false,
  layout: null,
  className: '',
};

export const ERRORS = {
  hook: {
    attemptToCall: 'Attempt to call "useShowUp". Check your provider or hook - "mountPoint" prop invalid',
    targetNotFound: 'Place to render not found. Check mountPoint prop in Provider or Hook',
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
