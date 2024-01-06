import Link from 'next/link';

const links = [
  { text: 'Basic demo', href: '/basic' },
  { text: 'Animation demo', href: '/animation' },
  { text: 'Render to ref', href: '/ref' },
  { text: 'Multiple providers', href: '/multipleProviders' },
]

const IndexPage = () => (
  <main>
    <ul>
      {
        links.map(({ text, href }) => (
          <li key={href}>
            <Link href={href}>
              { text }
            </Link>
          </li>
        ))
      }
    </ul>
  </main>
);

export default IndexPage;
