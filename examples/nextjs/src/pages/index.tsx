import Link from 'next/link';

const IndexPage = () => (
  <main>
    <ul>
      <li>
        <Link href={'/basic'}>
          Basic demo
        </Link>
      </li>
      <li>
        <Link href={'/animation'}>
          Animated demo
        </Link>
      </li>
    </ul>
  </main>
);

export default IndexPage;
