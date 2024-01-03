import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <body>
        <Main />
        <NextScript />

        {/* Root for UseShowUp hook. See _app.tsx */}
        <div id="useShowUpContainer" />
      </body>
    </Html>
  )
}
