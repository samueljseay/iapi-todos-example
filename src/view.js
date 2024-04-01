/**
 * WordPress dependencies
 */
import { store, getElement, getContext } from '@wordpress/interactivity';

const apiFetch = window.wp.apiFetch;

const addTodo = (description, isComplete, dueDate) => {
	return apiFetch({
		path: '/wp-todo-api/v1/todo',
		method: 'POST',
		data: { description, is_completed: isComplete, due_date: dueDate }
	});
}

console.log('init store');

store( 'iapi-todos', {
	state: {
		new_todo: {
			description: '',
			due_date: ''
		}
	},

	actions: {
		addTodo: function* () {
			const {new_todo} = getContext();
			
			yield addTodo(new_todo.description, false, new_todo.due_date);
		}
	},

	callbacks: {
		helloWorld: () => {
			console.log('Hello world');
		},
		
		updateTodo: (event) => {
			const { attributes } = getElement();
			const { new_todo } = getContext();
			const fieldToUpdate = attributes.name;

			if ( fieldToUpdate ) {
				new_todo[fieldToUpdate] = event.target.value;
			}	

			console.log(getContext().new_todo);
		}
	},
} );
