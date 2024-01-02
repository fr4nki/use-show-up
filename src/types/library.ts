import { ComponentType, ReactNode } from 'react';

export type ShowUpComponent<T = object> = ComponentType<T & {
  close: () => void;
}>;

export type ShowUpElement<T = object> = ComponentType<T>;

export type ShowUpLayout = ComponentType<{
  close: () => void;
  children?: ReactNode;
}>;

export type ShowUpOptions = {
  closeOnPressEscButton: boolean;
  closeOnPressOutside: boolean;
  showOnRender: boolean;
  focusFirstElementOnRender: boolean;
  handleHide?: () => void;
  handleShow?: () => void;
  layout?: ShowUpLayout | null;
  className?: string;
};

