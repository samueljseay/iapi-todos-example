
Start by running `pnpm step 2` to get a starting state.

In step 1, we simply activated the interactivity API, but it doesn't actually do anything. We render some TODO items in PHP but you can do that without the interactivity API.

For this step we will keep a form value's up to date in preparation to send them to the server later.

To do this, we'll talk a little about managing state in iapi.

iapi has 2 forms of state,

1. `state` Is global state, this is accessible to all iapi apps within the same page. This could be useful if you need some global shared data or state. ie, for a global app navigation this could be useful.
2. `context` Is "local" state. Imo generally more useful, because if you're building blocks you'll often want multiples of the same block on a page and each should typically maintain it's own state. `context` is much like React's [context](https://react.dev/learn/passing-data-deeply-with-context). It's available to everything within the DOM tree of your iapi instance.

There is more than one way to add an interactive form in iapi, but I'll show you one way here. We'll need to use context to store state of the form values.
## Add the code

I'm going to give you some loose instructions to implement this one yourselves.

Firstly you'll need to keep track of updates to the form, we'll add some context. As mentioned before context is just some client-side state. Just like we use in React all the time to keep track of things like form values. In React we might use `useState` because it's local to the component, but here `context` will serve the same purpose.

In `render.php` let's add some context to store the form values. First declare the variable:

```php
$context = array(
	'new_todo' => array(
		'description' => '',
		'due_date' => '',
	)
);
```

Now we embed the context on the top level HTML element of our server rendered HTML. We can use a utility method to conveniently serialize this for us: `wp_interactivity_data_wp_context`

Call it like this on the rendered HTML:

```
<div

	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="iapi-todos"
	data-wp-init="callbacks.helloWorld"
	<?php echo wp_interactivity_data_wp_context( $context ); ?>
>
```

Now that we have access to the context, we can use directives to bind it to the HTML. Now I'll try keep things a little vague so you can engage your brain.

We have this form in `render.php`:

```
<div>
	<label>Add new todo:</label>
	<input type="text"  data-wp-bind--value="context.new_todo.description" />
	<input type="date"  />
	<button>Add</button>
	<hr />
</div>
```

You'll need some directives to keep track of user changes to the form values. (Much like in React we would implement some kind of controlled input). 

Firstly, let's add `name` attributes to the form values. The text field is `description` and the date field is `due_date`. Then we should bind the values of the context to our form. We can use the `bind` directive to attach the values of new_todo to the values of the inputs in the form. Example:

`data-wp-bind--value="context.new_todo.description"`

This won't do anything noticeable at first! After all, the context is empty and we haven't told iapi how we want to update these values.

So next you'll need to listen for updates to the input and update the todo. `data-wp-on--input` will listen for input changes and run a callback you provide it (the `on` directive lets you bind to any event such as on click or input or keydown). You know how to write a callback from our very first step, can you work out what to do here to add a callback that updates the values stored in context? in the `on` directive you'll get access to the `Event` as the first argument.

There is probably more than one way you could approach this, but I'll give you some starting info, and you can fill the gaps. See if you can get it working. 

2 new imports from the interactivity API will be used here:

* `getContext`. Call it with no arguments to get the context which will include `new_todo`
* `getElement`. A convenience method that lets you access the attributes of the HTML node, we can use it here to determine which field to update on the `new_todo` context.

Here's a callback added to `callbacks` in `view.js`, I've left the last part blank so you can get this working yourself.

```javascript
import { store, getElement, getContext } from '@wordpress/interactivity';
callbacks: {
	updateForm: (event) => {
		// We can get access to the HTML element attributes to work out which field
		// we're updating.
		const { attributes } = getElement();
		const fieldToUpdate = attributes.name;
	
	    // Access the context from the callback!
		const context = getContext();
	
		// Update the context value here.
		context.new_todos[fieldToUpdate] = event.target.value;
	},
}
```

Now that we have a working form we can move on to sending a request to the server.


