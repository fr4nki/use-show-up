import Link from 'next/link';

import { useShowUp, type ShowUpComponent } from 'use-show-up';

const ShowUpComponent: ShowUpComponent<{ title: string }> = ({ title, hide }) => (
  <div
    id="popup-demo"
    style={{ background: 'hotpink', padding: 12 }}
  >
    <p>Popup title is "{title}"</p>

    <div>
      <label>
        Input here
        <br />
        <input />
      </label>
    </div>

    <div>
      <button onClick={hide}>
        close me
      </button>
    </div>
  </div>
);

const BasicPage = () => {
  const [Element, show, hide, toggle] = useShowUp(ShowUpComponent, {
    showOnRender: true,
    className: 'my-basic-example',
    handleHide: () => { console.log('hide'); },
    handleShow: () => { console.log('show'); },

    // You could set specific options for this popup and overwrite passed options to <UseShowUpProvider />
    //
    // hideOnPressEscButton: false,
    // hideOnPressOutside: false,
    // focusFirstElementOnRender: false,
    // layout: null,
  });

  return (
    <main style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Element {...{
        title: 'My basic example',
      }} />

      <Link href={'/'}>
        &larr; Back
      </Link>

      <p>Basic example</p>

      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
      <button onClick={toggle}>Toggle</button>
    </main>
  )
};

export default BasicPage;
