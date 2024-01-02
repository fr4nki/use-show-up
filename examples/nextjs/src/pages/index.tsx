import { useShowUp, type ShowUpComponent } from 'use-show-up';

interface Props {
  title: string;
}

const PopupDemo: ShowUpComponent<Props> = ({ title, close }) => (
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
      <button onClick={close}>
        close me
      </button>
    </div>
  </div>
)

const Index = () => {
  const [Popup, show, hide, toggle] = useShowUp(PopupDemo, {
    showOnRender: true,
    className: 'my-awesome-popup',
    handleHide: () => { console.log('hide'); },
    handleShow: () => { console.log('show'); },

    // You could set specific options for this popup and overwrite passed options to <UseShowUpProvider />
    //
    // closeOnPressEscButton: false,
    // closeOnPressOutside: false,
    // focusFirstElementOnRender: false,
    // layout: null,
  });

  return (
    <main style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Popup {...{
        title: 'My demo popup',
      }} />

      <p>Demo</p>

      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
      <button onClick={toggle}>Toggle</button>
    </main>
  )
};

export default Index;
