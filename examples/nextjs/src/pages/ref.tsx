import Link from 'next/link';

import { useShowUp, type ShowUpComponent } from 'use-show-up';
import { useRef } from "react";

const ShowUpComponent: ShowUpComponent<{ title: string }> = ({ title, hide }) => (
  <div
    id="popup-demo"
    style={{ background: 'hotpink', padding: 12, position: 'absolute', top: 10, right: 10 }}
  >
    <p>Popup title is "{title}"</p>

    <div>
      <label>
        Input here
        <br />
        <input />
      </label>
    </div>

    <div style={{ marginTop: 12 }}>
      <button onClick={hide}>
        close me
      </button>
    </div>
  </div>
);

const RenderToRefPage = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const [Element, show, hide, toggle] = useShowUp(ShowUpComponent, {
    showOnRender: false,
    className: 'my-ref-example',
    mountPoint: targetRef,
    layout: null,
    hideOnPressEscButton: false,
    hideOnPressOutside: false,
  });

  return (
    <main style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Element {...{
        title: 'My Ref example',
      }} />

      <div id="my-ref-showup-container" ref={targetRef} />

      <Link href={'/'}>
        &larr; Back
      </Link>

      <p>Ref example</p>

      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
      <button onClick={toggle}>Toggle</button>
    </main>
  )
};

export default RenderToRefPage;
