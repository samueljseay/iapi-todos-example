
Start by running `pnpm step 3` to get a starting state.

The next step is to persist a user's new TODO item to the server. Like most front-end applications we'll use fetch to asynchronously send a request to our API.

We already have an API in place on our backend, so we just need to call it in response to the "Add" button being clicked.

For performing asynchronous operations in Interactivity API it is best to use a generator function, not async/await. This is important because it allows the Interactivity API to properly provide up-to-date state while you perform asynchronous actions. If you don't know much about generators it's ok, what you just need to know for now, is that if we perform an asynchronous action within a callback we want to use a generator which is a function declared like `function* () {...}`, and that every time you'd normally `await` a `Promise` in an `async` function, we'll instead use the `yield` keyword.

## Create a TODO

For the first step, lets add a generator function to our callbacks:

Add this in `view.js` in the `actions` object (note the `*` denoting this is a generator.)


```js
actions: {
	addTodo: function* () {
		// TODO send a request
		const {description, due_date} = getContext().new_todo;
		yield addTodo(...);
	}
}
```

We can use `apiFetch` here, but because there is not module support for anything outside of `@wordpress/interactivity` right now, we need to load it from the window global instead:

```js
const apiFetch = window.wp.apiFetch;
```

Now for your convenience here's a function using `apiFetch` to create a new TODO:

```js
const addTodo = (description, isComplete, dueDate) => {
	return apiFetch({
		path: '/wp-todo-api/v1/todo',
		method: 'POST',
		data: { description, is_completed: isComplete, due_date: dueDate }
	});
}
```

So let me give you some clues and see if you can finish the implementation:

Within your new generator you'll need to:

1. Get the form values from context (`getContext`)
2. `addNewTodo` returns a promise, pass description and due date and `yield` it.

Now once you have done that, we will add some simple UI states during and after the sending of the request, to indicate to the user that something was happening while we processed the server request to add a TODO.

To do this I'll add some more context:

We'll add 2 more values initialized in `render.php`:

1. `formIsProcessing` Terrible name, but this is an indicator to tell the user that our request to create a TODO is still in progress. We'll initialize this as `false`.
2. `errorMessage`. If something goes wrong with the server request, we want to surface that to the user. We'll initialize this as `false`, and set it to a string containing any error message received while trying to send the server request.

Now we need to coordinate the setting of these new context properties and this is where `yield` is important, because generator's automatically handle the setting of context for us to ensure that `context` is correct at every step in the asynchronous flow. It's up to you how you bind these values in your directives. e.g. you could combine `formIsProcessing` with `data-wp-bind--hidden` to show/hide a progress indicator (could just be a span with text "in progress..."). or you could disable the form inputs with `data-wp-bind--disabled`. 

**Note 1** that while you can't use complex JS expressions inside attribute bindings, you can use `!` as logical `not`.

**Note 2**, you can introduce an artificial delay in development if you want to easily see your UI states change when the server is too quick!. Here's one you can yield in your generator:

```js
const artificialDelay = (ms) => new Promise( resolve => setTimeout(resolve, ms) );
```

Have a go at setting the context variables throughout the async flow of creating a TODO. There are many ways to go about this so there is not a single correct answer.

**Finally note** even though we do create a new TODO on the server, you won't see it reflected in the list on screen. In the next step we'll fix that. To confirm it works for now, you'll just need to refresh the page and see that a new TODO is correctly added.