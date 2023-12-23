import {
  ComponentProps,
  ComponentType,
  createElement,
  Fragment,
  useContext, useEffect, useRef,
  useState
} from "react";
import {Popup, PopupOptions, PopupInternalMethods} from "./types";
import {UsePopupContext} from "./context";
import {PopupContent} from "./portalEl";

type Methods = {
  open: () => void;
  close: () => void;
};

type PopupProps<T = object> = Omit<ComponentProps<Popup<T>>, 'close'>;

type PopupComponent<T = object> = ComponentType<PopupProps<T>> & Methods;

export const usePopup = <T = object>(
  element: Popup<T>,
  options?: Partial<PopupOptions>,
): PopupComponent<T> => {
  console.log('111111$$$$$$$$$$$$$$#######################################$$$$$$$');

  const popupContext = useContext(UsePopupContext);

  const targetRef = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  const currentPopupPros: PopupOptions = {
    ...popupContext,
    ...options,
  };

  useEffect(() => {
    const target = document.createElement('div')

    const classList = [
      `popup-container`,
      element.displayName ? `popup-container-${element.displayName}` : ''
    ].filter((s) => !!s);

    target.classList.add(...classList);

    popupContext.mountPointElement.appendChild(target);

    targetRef.current = target;
  }, []);

  const open = () => {
    if (!shown) {
      setShown(true);
      currentPopupPros.handleShown();
    }
  };

  const close = () => {
    if (shown) {
      setShown(false);
      currentPopupPros.handleClose();
    }
  };

  const wrapper = (props: any) => (
    createElement(Fragment, props, props.children)
  );

  const inner = (props: any) => (
    createElement(PopupContent, { ...props, shown, ...currentPopupPros, target: targetRef.current }, createElement(content, props))
  );

  const content = (props: T & PopupInternalMethods) => (
    createElement(element, { ...props, close })
  );

  const component = (props: PopupProps<T>) => (
    createElement(wrapper, null, createElement(inner, props))
  );

  component.open = open;
  component.close = close;

  return component;
};
