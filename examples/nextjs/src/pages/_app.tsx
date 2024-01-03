import type { AppProps } from 'next/app'

import { UseShowUpProvider, ShowUpLayout } from 'use-show-up';

import '../style.css';

const CommonPopupLayout: ShowUpLayout = ({ hide, children }) => (
  <div
    id="layout"
    style={{
      background: 'mediumaquamarine',
      padding: 12,
      position: 'fixed',
      width: '80vw',
      height: '80vh',
      top: 0,
      left: 0,
      transform: 'translate(10vw, 10vh)',
    }}
  >
    <p>Layout</p>

    <div id="layout-children">
      { children }
    </div>

    <button onClick={hide}>Close button in Layout</button>

    <p>/Layout</p>
  </div>
)

const App = ({ Component, pageProps }: AppProps) => (
  <UseShowUpProvider
    // Place to render all Popups. Take a look at _document.tsx
    mountPointSelector='#popupContainer'
    // It might be useful to set one layout for all Popups
    layout={CommonPopupLayout}
    // All settings available here and would be inherited by all nested Popups
    // handleShow={() => {}}
    // hideOnPressEscButton={true}
    // hideOnPressOutside={false}
    // showOnRender={false}
    // focusFirstElementOnRender={true}
    // handleHide={() => { /* do something */ }}
    // handleShow={() => { /* do something */ }}
    // className="my-awesome-popup"
  >
    <Component {...pageProps} />
  </UseShowUpProvider>
)

export default App;
