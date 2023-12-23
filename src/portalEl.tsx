import React,{FC, PropsWithChildren} from "react";
import {createPortal} from "react-dom";
import {PopupOptions} from "./types";

interface Props extends PopupOptions {
  shown: boolean;
  target: HTMLDivElement | null;
}

export const PopupContent: FC<PropsWithChildren<Props>> = ({
  shown,
  children,
  closeOnPressEscButton,
  closeOnPressOutside,
  handleClose,
  layout,
  target,
}) => {
  // const createElement = () => {
  //   if (typeof document !== 'undefined') {
  //     const ee = document.createElement('div');
  //     ee.classList.add(`foo-${+new Date()}`);
  //
  //     return ee;
  //   }
  //
  //   return null;
  // };
  //
  // const el = useRef<HTMLDivElement>(createElement());
  // const [created, setCreated] = useState(false);
  //
  // useEffect(() => {
  //   setCreated(true);
  // }, []);

  if (typeof document === 'undefined') {
    return null;
  }

  // const target = document.querySelector('#some');

  if (!target) {
    return null;
  }

  console.log('closeOnPressEscButton', closeOnPressEscButton);
  console.log('closeOnPressOutside', closeOnPressOutside);
  console.log('handleClose', handleClose);
  console.log('layout', layout);

  const component = (
    <div>
      internal

      { children }

      internal
    </div>
  );

  if (shown) {
    return createPortal(component, target, new Date().toString());
  }

  return null;
}
