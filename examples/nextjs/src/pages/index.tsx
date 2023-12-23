import { usePopup } from 'use-show-up';

const PopupDemo = ({ }) => (
  <div>
    Popup Content
  </div>
)

const Index = () => {
  const Popup = usePopup(PopupDemo);

  return (
    <main>
      Demo

      <Popup />

      <button
        onClick={() => {
          Popup.open();
        }}
      >
        Show
      </button>

      <button
        onClick={() => {
          Popup.close();
        }}
      >
        Hide
      </button>
    </main>
  )
};

export default Index;
