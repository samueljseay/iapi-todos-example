/**
 * WordPress dependencies
 */
import { store, getElement, getContext } from '@wordpress/interactivity';

const apiFetch = window.wp.apiFetch;

//  Use this if you want to see the UI state updates like formIsProcessing.
const artificialDelay = (ms) => new Promise( resolve => setTimeout(resolve, ms) );

const addTodo = (description, isComplete, dueDate) => {
	return apiFetch({
		path: '/wp-todo-api/v1/todo',
		method: 'POST',
		data: { description, is_completed: isComplete, due_date: dueDate }
	});
}

const updateTodo = (todo) => {
	return apiFetch({
		path: `/wp-todo-api/v1/todo/${todo.id}`,
		method: 'PUT',
		data: { description: todo.description, is_completed: todo.is_completed, due_date: todo.due_date }
	});
}

store( 'iapi-todos', {
	state: {},

	actions: {
		addTodo: function* () {					
			const context = getContext();

			context.formIsProcessing = true;
			
			try {
				const todo = yield addTodo(context.new_todo.description, false, context.new_todo.due_date);
				context.todos = [ ...context.todos, todo ];
			} catch (error) {
				context.errorMessage = `Could not add TODO: ${error.message}`;
			}
			
			context.new_todo = { description: '', due_date: '' };
			context.formIsProcessing = false;
		}
	},

	callbacks: {
		helloWorld: () => {
			console.log('Hello world');
		},
		
		updateForm: (event) => {
			const { attributes } = getElement();
			const context = getContext();
			const fieldToUpdate = attributes.name;

			if ( fieldToUpdate ) {
				context.new_todo[fieldToUpdate] = event.target.value;
			}
		},

		toggleComplete: function* (event) {
			const context = getContext();
			
			context.formIsProcessing = true;
			
			const value = event.target.value;
			const isChecked = event.target.checked;
			const todo = context.todos.find( todo => String(todo.id) === value );

			try {
				yield updateTodo({...todo, is_completed: isChecked});
			} catch (error) {
				errorMessage = `Could not update TODO: ${error.message}`;
			}

			context.formIsProcessing = false;
		}
	},
} );
