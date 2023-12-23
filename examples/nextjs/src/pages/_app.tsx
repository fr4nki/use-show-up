import type { AppProps } from 'next/app'

import { UsePopupProvider } from 'use-show-up';

const App = ({ Component, pageProps }: AppProps) => (
  <UsePopupProvider
    // See _document.tsx
    mountPointSelector='#popupContainer'
  >
    <Component {...pageProps} />
  </UsePopupProvider>
)

export default App;
