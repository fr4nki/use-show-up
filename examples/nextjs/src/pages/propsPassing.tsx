import Link from 'next/link';

import { useShowUp, type ShowUpComponent } from 'use-show-up';

const ShowUpComponent: ShowUpComponent<{ title: string }> = ({ title, hide }) => (
  <div
    id="show-up-demo"
    style={{ background: 'hotpink', padding: 12 }}
  >
    <p>Title is "{title}"</p>

    <div>
      <button onClick={hide}>
        close me
      </button>
    </div>
  </div>
);

const BasicPage = () => {
  const [Element, show, hide, toggle] = useShowUp(ShowUpComponent);

  return (
    <main style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Element title='My basic example' />

      <Link href={'/'}>
        &larr; Back
      </Link>

      <p>Basic example</p>

      <button onClick={() => show({ title: 'show1' })}>Show1</button>
      <button onClick={() => show({ title: 'show2' })}>Show2</button>
      <button onClick={() => show({ title: 'show3' })}>Show3</button>
      <button onClick={() => hide()}>Hide</button>
      <button onClick={() => toggle()}>Toggle</button>
    </main>
  )
};

export default BasicPage;
