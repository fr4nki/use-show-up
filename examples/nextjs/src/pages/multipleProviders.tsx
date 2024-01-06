import { useRef } from 'react';

import { useShowUp, type ShowUpComponent, UseShowUpProvider } from 'use-show-up';
import Link from "next/link";

const ShowUpComponentFirst: ShowUpComponent = ({ hide }) => (
  <div
    id="popup-demo"
    style={{ background: 'hotpink', padding: 12, position: 'absolute', top: 10, right: 10 }}
  >
    <p>First Popup</p>

    <div style={{ marginTop: 12 }}>
      <button onClick={hide}>
        close me
      </button>
    </div>
  </div>
);

const ShowUpComponentSecond: ShowUpComponent = ({ hide }) => (
  <div
    id="popup-demo"
    style={{ background: 'hotpink', padding: 12, position: 'absolute', top: 10, right: 10 }}
  >
    <p>Second Popup</p>

    <div style={{ marginTop: 12 }}>
      <button onClick={hide}>
        close me
      </button>
    </div>
  </div>
);

const FirstComponent = () => {
  const [ElementFirst, showFirst] = useShowUp(ShowUpComponentFirst);

  return (
    <div>
      <p>Inside first Provider</p>

      <ElementFirst />

      <button onClick={showFirst}>Show first</button>
    </div>
  )
};

const SecondComponent = () => {
  const [ElementSecond, showSecond] = useShowUp(ShowUpComponentSecond);

  return (
    <div>
      <p>Inside second Provider</p>

      <ElementSecond />

      <button onClick={showSecond}>Show second</button>
    </div>
  )
};

const MultipleProviders = () => {
  const targetFirstRef = useRef<HTMLDivElement | null>(null);
  const targetSecondRef = useRef<HTMLDivElement | null>(null);

  return (
    <main>
      <Link href={'/'}>
        &larr; Back
      </Link>

      <div>
        <UseShowUpProvider
          mountPoint={targetFirstRef}
          hideOnPressEscButton={true}
          hideOnPressOutside={true}
          showOnRender={false}
        >
          <FirstComponent />
        </UseShowUpProvider>
      </div>

      <div>
        <UseShowUpProvider
          mountPoint={targetSecondRef}
          hideOnPressEscButton={false}
          hideOnPressOutside={false}
          showOnRender={true}
        >
          <SecondComponent />
        </UseShowUpProvider>
      </div>

      <div ref={targetFirstRef} />
      <div ref={targetSecondRef} />
    </main>
  )
};

export default MultipleProviders;
