import { store, getElement, getContext } from '@wordpress/interactivity';

const apiFetch = window.wp.apiFetch;

const artificialDelay = (ms) => new Promise( resolve => setTimeout(resolve, ms) );

const addTodo = (description, isComplete, dueDate) => {
	return apiFetch({
		path: '/wp-todo-api/v1/todo',
		method: 'POST',
		data: { description, is_completed: isComplete, due_date: dueDate }
	});
}

store( 'iapi-todos', {
	actions: {
		addTodo: function* () {					
			const context = getContext();

			context.formIsProcessing = true;
			
			try {
				yield artificialDelay(1000);
				const todo = yield addTodo(context.new_todo.description, false, context.new_todo.due_date);
				context.todos = [...context.todos, todo];
			} catch (error) {
				context.errorMessage = `Could not add TODO: ${error.message}`;
			}
			
			// Clear the form.
			context.new_todo = { description: '', due_date: '' };
			context.formIsProcessing = false;
		}
	},

	callbacks: {
		// Add some magic here!
		helloWorld: () => {
			console.log( 'Hello World!' );
		},

		updateForm: (event) => {
			// We can get access to the HTML element attributes to work out which field
			// we're updating.
			const { attributes } = getElement();
			const fieldToUpdate = attributes.name;
			
			const context = getContext();
		
			// Update the context value here.
			if ( context.new_todo[fieldToUpdate] !== undefined ) {
				context.new_todo[fieldToUpdate] = event.target.value;
			}

			console.log(context.new_todo);
		},
	}
		
} );
