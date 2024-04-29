
Start by running `pnpm step 1` to get a starting state.

For a hello-world example of running the interactivity API, we'll start by introducing directives. iapi can be likened to a framework like [Alpine.js](https://alpinejs.dev/). You won't write any JSX, rather you'll server side render HTML and you'll use specially recognized data attributes to add interactivity to your HTML.

These attributes are called directives. Bookmark this [full list of directives](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-interactivity/packages-interactivity-api-reference/), so you can use it as a reference for solving any of the problems we work on here.
****
The first directive we'll use is called `wp-init`. If you're coming from React you can think of this directive as roughly equivalent to:

```
useEffect(() => {
	// do something after this component mounts.
}, []);
```

`wp-init` will run after the HTML node it's attached to is rendered.

But first we need to tell Interactivity API that the HTML we're rendering should be made interactive. To do that we'll use the `data-wp-interactive` directive.

## Add the directive

1. Open up `src/render.php`
2. On the top level `div`, add 2 data attributes:
	1. Add `data-wp-interactive="iapi-todos"`, this "turns on" the interactivity API. The name can be anything but it must match your store definition in JS (we'll get to that).
	2. Add `data-wp-init="callbacks.helloWorld"`
3. Now open `src/view.js`, 
4. We'll need to initialize a store here. The store name should match the name we passed to the interactive attribute (iapi-todos).
`import {store} from '@wordpress/interactivity';`
1. Now let's add a "hello world".
	1. In the object passed to `store` add a new object property called `callbacks`. 
	2. In `callbacks` add a function that matches the name we set in `data-wp-init` (`helloWorld`).
	3. In this callback you can put anything that will show the callback was run and confirm that interactivity API is working. I just put: `console.log('Hello World');`
2. If you're using `pnpm start`, it will be building your changes as we go along, otherwise run `pnpm build`, to update your built code.
3. Now preview the front-end of the post or page you created and see that your console log is working!



