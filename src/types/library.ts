import { ComponentType, ReactNode } from 'react';

export type ShowUpComponent<T = object> = ComponentType<T & {
  hide: () => void;
}>;

export type ShowUpElement<T = object> = ComponentType<T>;

export type ShowUpLayout = ComponentType<{
  hide: () => void;
  children?: ReactNode;
}>;

export type ShowUpOptions = {
  hideOnPressEscButton: boolean;
  hideOnPressOutside: boolean;
  showOnRender: boolean;
  focusFirstElementOnRender: boolean;
  handleHide?: () => void;
  handleShow?: () => void;
  layout?: ShowUpLayout | null;
  className?: string;
};

