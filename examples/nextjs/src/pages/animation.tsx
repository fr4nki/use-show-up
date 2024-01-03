import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useShowUp, type ShowUpComponent, ShowUpLayout } from 'use-show-up';

const ShowUpLayout: ShowUpLayout = ({ hide, children }) => (
  <div
    id="animation-demo-layout"
    style={{
      top: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      position: 'fixed',
      width: '100vw',
      height: '100vh',
    }}
  >
    <button
      onClick={hide}
      style={{
        background: 'white',
        border: 'none',
        borderRadius: 10000,
        padding: 10,
        width: 36,
        height: 36,
        position: 'absolute',
        top: 48,
        right: 48,
        zIndex: 1,
      }}
    >
      <svg fill="#000000" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z"
          fillRule="evenodd"
        />
      </svg>
    </button>

    { children }
  </div>
)

const ShowUpComponent: ShowUpComponent<{ title: string }> = ({ title, hide }) => {
  const ref = useRef(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setIsShown(true);
  }, []);

  return (
    <CSSTransition
      in={isShown}
      nodeRef={ref}
      timeout={500}
      // Animation styles set in styles.css
      classNames="alert"
      unmountOnExit
    >
    <div
      id="animation-demo-popup"
      ref={ref}
      style={{
        background: 'hotpink',
        padding: 12,
        width: '50vw',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }}
    >
      <p
        style={{ marginTop: 0, fontWeight: 700 }}
      >
        Popup title is "{title}"
      </p>

      <div>
        <label>
          Input here
          <br />
          <input />
        </label>
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={hide}>
          close me
        </button>
      </div>
    </div>
    </CSSTransition>
  )
}

const AnimationPage = () => {
  const [Element, show, hide, toggle] = useShowUp(ShowUpComponent, {
    className: 'my-animated-example',
    handleHide: () => { console.log('hide'); },
    handleShow: () => { console.log('show'); },
    layout: ShowUpLayout,
    focusFirstElementOnRender: true,
  });

  return (
    <main style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Element {...{
        title: 'My animated example',
      }} />

      <Link href={'/'}>
        &larr; Back
      </Link>

      <p>Animated example</p>

      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
      <button onClick={toggle}>Toggle</button>

    </main>
  )
};

export default AnimationPage;
