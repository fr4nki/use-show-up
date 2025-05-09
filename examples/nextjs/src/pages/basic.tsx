import Link from 'next/link';

import { useShowUp, type ShowUpComponent } from 'use-show-up';

const ShowUpComponent: ShowUpComponent<{ title: string }> = ({ title, hide }) => (
  <div
    id="show-up-demo"
    style={{ background: 'hotpink', padding: 12 }}
  >
    <p>Title is "{title}"</p>

    <div>
      <label>
        Input here
        <br />
        <input type="text" placeholder="Enter something" id="name" name="name" />
      </label>
    </div>

    <div>
      <button onClick={hide}>
        close me
      </button>
    </div>
  </div>
);

const BasicPage = () => {
  const [Element, show, hide, toggle] = useShowUp(ShowUpComponent, {
    hideOnPressOutside: false,
  });

  return (
    <main style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Element title='My basic example' />

      <Link href={'/'}>
        &larr; Back
      </Link>

      <p>Basic example</p>

      <button onClick={() => show()}>Show</button>
      <button onClick={() => hide()}>Hide</button>
      <button onClick={() => toggle()}>Toggle</button>
    </main>
  )
};

export default BasicPage;
