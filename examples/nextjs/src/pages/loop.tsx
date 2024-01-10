import Link from 'next/link';

import { useShowUp, type ShowUpComponent } from 'use-show-up';


const ELEMENTS_TO_RENDER = [
  { key: 'a', text: 'Element a', title: 'A' },
  { key: 'b', text: 'Element b', title: 'B' },
  { key: 'c', text: 'Element c', title: 'C' },
  { key: 'd', text: 'Element d', title: 'D' },
];

const ShowUpComponent: ShowUpComponent<{ title: string }> = ({ title, hide }) => (
  <div
    id="demo"
    style={{ background: 'hotpink', padding: 12, position: 'absolute', top: 10, right: 10 }}
  >
    <p>Title is "{title}"</p>

    <div style={{ marginTop: 12 }}>
      <button onClick={hide}>
        close me
      </button>
    </div>
  </div>
);

const InLoopPage = () => {
  const [Element, show] = useShowUp(ShowUpComponent, {
    showOnRender: false,
    layout: null,
    hideOnPressEscButton: true,
    hideOnPressOutside: false,
  });

  return (
    <div>
      <main style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Element title='Default title' />

        <Link href={'/'}>
          &larr; Back
        </Link>

        <p>Render in loop and override props</p>
      </main>

      <div>
        {
          ELEMENTS_TO_RENDER.map((el, idx) => {
            const isWithoutProps = idx === 1;
            const showProps = isWithoutProps ? undefined : { title: el.title };
            const text = isWithoutProps ? 'Show default title' : `Show title ${el.title}`

            return (
              <div key={el.key}>
                <button
                  onClick={() => show(showProps)}
                  style={{ marginRight: 10 }}
                >
                  show
                </button>

                <span>{ text }</span>
              </div>
            );
          })
        }
      </div>
    </div>
  )
};

export default InLoopPage;
