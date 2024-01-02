import type { AppProps } from 'next/app'

import { UseShowUpProvider, ShowUpLayout } from 'use-show-up';

const Layout: ShowUpLayout = ({ close, children }) => (
  <div
    id="layout"
    style={{ background: 'mediumaquamarine', padding: 12 }}
  >
    <p>Layout</p>

    <div id="layout-children">
      { children }
    </div>

    <button onClick={close}>Close button in Layout</button>

    <p>/Layout</p>
  </div>
)

const App = ({ Component, pageProps }: AppProps) => (
  <UseShowUpProvider
    // Place to render all Popups. Take a look at _document.tsx
    mountPointSelector='#popupContainer'
    // It might be useful to set one layout for all Popups
    layout={Layout}
    // All settings available here and would be inherited by all nested Popups
    // handleShow={() => {}}
    // closeOnPressEscButton={true}
    // closeOnPressOutside={false}
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
