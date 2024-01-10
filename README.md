# useShowUp

A tiny opinionated React hook for popping up stuff with zero fuss.

## Example

```typescript jsx
import { useShowUp, type ShowUpComponent } from 'use-show-up';

interface ShowUpElementProps {
  title: string;
}

const ShowUpElement: ShowUpComponent<ShowUpElementProps> = ({ title, hide }) => (
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

      <button onClick={() => show()}>Show</button>
      <button onClick={() => hide()}>Hide</button>
    </main>
  )
};

const App = () => {
  <UseShowUpProvider
    // Place to render all ShowUpElements. Probably somewhere in <body>
    // Could be valid CSS selector, HTMLElement or RefObject
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

- UseShowUpProvider [optional] _component_
- useShowUp _hook_

### useShowUp
Hook should be placed in the functional component. All passed props overrides Provider
props if Provider exists.

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
  mountPoint: myContainerRef // '#myContainer' or document.getElementById('myContainer'),
});
```

- `<Element />`

Element must be inserted into your component

- `show()` _Partial\<ShowUpElementProps>_ or _undefined_. Default `undefined`

Showing up `<Element />`. Possible to pass part of full prop list of MyComponent as argument. E.g: `show({ some: 'thing' })`.

- `hide()`

Hide rendered `<Element />`

- `toggle()` _Partial\<ShowUpElementProps>_ or _undefined_. Default `undefined`

Show and hide in one function. Same as `show`, possible to pass part of full prop list of MyComponent as argument

- `mountPoint` _string_ or _ref_ or _HTMLElement_. Default `''`

Place to render current `<Element />`

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
Provider is optional and can be set anywhere you want.
All child uses of useShowUp hook will inherit options from UseShowUpProvider.
Unless it overridden in place.

#### API

```typescript jsx
<UseShowUpProvider
  mountPoint='#myContainer'
  hideOnPressEscButton={true}
  hideOnPressOutside={true}
  showOnRender={false}
  focusFirstElementOnRender={false}
  handleHide={() => { console.log('hide'); }}
  handleShow={() => { console.log('show'); }}
  layout={({ children }) => <>{ children }</> }
  className="my-show-up-element"
>
  ...
</UseShowUpProvider>
```

### Examples

- [Next.js](./examples/nextjs/src/pages/basic.tsx)
