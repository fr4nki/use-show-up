# useShowUp

A tiny opinionated React hook for popping up stuff with zero fuss.

## Example

```typescript jsx
import { useShowUp, type ShowUpComponent } from 'use-show-up';

const ShowUpElement: ShowUpComponent<{ title: string }> = ({ title, hide }) => (
  <div>
    <h1>Title is "{title}"</p>

    <p>My content</p>

    <button onClick={hide}>
      Сlose me
    </button>
  </div>
);

const Component = () => {
  const [Element, show, hide] = useShowUp(ShowUpElement, {
    showOnRender: true,
    // list of all options see below
  });

  return (
    <main>
      <Element {...{
        title: 'My demo',
      }} />

      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
    </main>
  )
};

const App = () => {
  <UseShowUpProvider
    // Place to render all Popups. Probably somewhere in <body>
    mountPointSelector='#showUps'
  >
    <Component>
  </UseShowUpProvider>
};

// and somewhere in index.html

<div id="showUps"></div>
```

More detailed examples available in [/examples](./examples) directory.

## Setup

`npm install use-show-up`

or

`yarn add use-show-up`

or

`pnpm add use-show-up`

## Usage

This library contains two necessary React components:

- UseShowUpProvider _component_
- useShowUp _hook_

### useShowUp
hook should be placed in the functional component.

#### API

```typescript jsx
const [Element, show, hide, toggle] = useShowUp(MyComponent, {
  layout: ({ children }) => <>{ children }</>,
  className: "my-show-up-element",
  hideOnPressEscButton: true,
  hideOnPressOutside: true,
  showOnRender: false,
  focusFirstElementOnRender: false,
  handleHide: () => { console.log('hide'); },
  handleShow: () => { console.log('hide'); },
});
```

- `<Element />`

Element must be inserted into component

- `show()`

Renders `<Element />` to the place specified in `<UseShowUpProvider />`

- `hide()`

Just hiding rendered `<Element />`

- `toggle()`

Show and hide in one function

- `layout` _ShowUpLayout_ or _null_. Default `null`

Sometimes might be useful to separate layout and content. See [example here](./examples/nextjs/src/pages/_app.tsx)

- `className` _string_. Default `''`

Pass extra css classname to `<Element />` container

- `hideOnPressEscButton` _boolean_. Default: `true`

Same as `hide()` method but by the key press

- `hideOnPressOutside` _boolean_. Default: `true`

Same as `hide()` method but by clicking outside of the `<Layout />`

- `showOnRender` _boolean_. Default: `false`

Show `<Element />` once the parent component has been rendered

- `focusFirstElementOnRender` _boolean_. Default: `false`

Set focus to the first element in `<Element />` could possible be focused

- `handleHide` _function_ or _null_. Default `null`

Run your callback on `hide()`

- `handleShow` _function_ or _null_. Default `null`

Run your callback on `show()`

### UseShowUpProvider
Provider should be set at the top of you app, same as any other Providers.

#### API

```typescript jsx
<UseShowUpProvider
  mountPointSelector='#showUpContainer'

  hideOnPressEscButton={true}
  hideOnPressOutside={true}
  showOnRender={false}
  focusFirstElementOnRender={false}
  handleHide={() => { console.log('hide'); }}
  handleShow={() => { console.log('hide'); }}
  layout={({ children }) => <>{ children }</> }
  className="my-show-up-element"
>
  ...
</UseShowUpProvider>
```

Provider accepts same options as useShowUp hook except `mountPointSelector`.
All of these passed props will be applied to all `useShowUp` hook calls.
Unless it will be overridden in place

- `mountPointSelector` _string_. Required

Place to render all `<Elements />` called by `useShowUp` hook

### Examples

- [Next.js](./examples/nextjs/src/pages/basic.tsx)
