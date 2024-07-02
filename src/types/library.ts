import {ComponentType, HTMLAttributes, ReactNode, RefObject} from 'react';

export type ShowUpElement<T = object> = ComponentType<T>;

export type PartialShowUpElementProps<T = object> = Partial<Omit<T, 'hide'>>;

export type ShowUpComponent<T = object> = ComponentType<T & {
  hide: () => void;
}>;

export type ShowUpLayout = ComponentType<{
  hide: () => void;
  children?: ReactNode;
}>;

export type ShowUpOptions = {
  mountPoint: string | HTMLElement | RefObject<HTMLElement>;
  hideOnPressEscButton: boolean;
  hideOnPressOutside: boolean;
  showOnRender: boolean;
  focusFirstElementOnRender: boolean;
  handleHide?: () => void;
  handleShow?: () => void;
  layout?: ShowUpLayout | null;
  className?: string;
  wrapperElementTag?: keyof HTMLElementTagNameMap;
  wrapperElementAttributes?: ShowUpOptions['wrapperElementTag'] extends keyof HTMLElementTagNameMap
    ? HTMLAttributes<ShowUpOptions['wrapperElementTag']>
    : HTMLAttributes<HTMLDivElement>;
};
