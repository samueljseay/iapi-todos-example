
Start by running `pnpm step 4` to get a starting state.

So in the last step we created a TODO on the server, but we didn't update the user interface to show this change.

In this step we'll use the `wp-each` directive to change how TODO's are rendered and allow us to easily update our list of TODO's optimistically in the UI.

### Add TODOs to context

The first step is to include the list of todo's in the context we render on the server side.

In `render.php` we will add `todos` to the context:

```php
$context = array(
	'new_todo' => array(
		'description' => '',
		'due_date' => '',
	),
	'todos' => $todos
);
```

Previously we just rendered TODOs in php by looping through them server side. Now we'll change approach. We will use the `wp-each` directive.

The `wp-each` directive lets us render a `template` server side. This template can be bound to our context and for each item in the context we can render a TODO item. The upside of this is, whenever we update the context client-side the UI will immediately be updated with our changes.

We're going to adjust the code so that when we add a new TODO, we update the UI client side to show the TODO we added. There are lots of ways to update your interface when building web apps. You can be optimistic and then fallback to retrying to sync data if it gets out of date. For this we won't be that optimistic. We'll try send a request to add the TODO and if its successful we'll update the UI with the new TODO. We'll also add some basic UI state to show that an operation is in progress and show if an error happened.

## Render with wp-each

First we render a `template` and pass it `context.todos`. Now within the template by default each TODO item is accessible under `context.item`. I've provided a basic example of displaying the `description`. I'll leave you to convert the rest of the PHP rendering to directives:

```php
<template data-wp-each--todo="context.todos">
	<li>
		<span data-wp-text="context.todo.description"></span>
		<hr />
	</li>
</template>
```

Now when you render your app you should notice that as before your TODO's are still rendered server side as before. ✨ The difference is that if we update `context.todos` in `view.js` we should now see immediate updates.

Let's enhance `addTodo` to update the context with the TODO that was added. See if you can do that step yourself. Once the API request is finished you'll just need to add the new todo `context.todos`. You should see the newly added TODO immediately reflected in the list if you've correctly implemented that.

### Step 5 - Complete TODOs

Start by running `pnpm step 5` to get a starting state.

For a final exercise, we can now implement "marking TODOs as completed". For your convenience here is a function that will do the server request to update the TODO:

```js
const updateTodo = (todo) => {
	return apiFetch({
		path: `/wp-todo-api/v1/todo/${todo.id}`,
		method: 'PUT',
		data: { description: todo.description, is_completed: todo.is_completed, due_date: todo.due_date }
	});
}
```

You'll need to listen to the checkbox change event and then send a request to the server. And, like before you'll need to update `context.todos` to immediately reflect the update in the UI. You'll also need to bind the checked value of the checkbox to the TODO.

**Hint**: The API needs the TODO's ID to do the update. You can bind the todo ID to the checkbox value if you want, and then you could access it in the change handler.

If you'd like to see a completed example implementation you can run `pnpm step 6`.
