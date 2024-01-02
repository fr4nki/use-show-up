import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <body>
        <Main />
        <NextScript />

        {/* Root element for UseShowUp hook. See _app.tsx */}
        <div id="popupContainer" />
      </body>
    </Html>
  )
}
