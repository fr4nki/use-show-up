import Link from 'next/link';

import { useShowUp, type ShowUpComponent } from 'use-show-up';

const PopupDemo: ShowUpComponent<{ title: string }> = ({ title, hide }) => (
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
  const [Popup, show, hide, toggle] = useShowUp(PopupDemo, {
    showOnRender: true,
    className: 'my-awesome-basic-popup',
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
      <Popup {...{
        title: 'My demo popup',
      }} />

      <Link href={'/'}>
        &larr; Back
      </Link>

      <p>Basic popup</p>

      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
      <button onClick={toggle}>Toggle</button>
    </main>
  )
};

export default BasicPage;
