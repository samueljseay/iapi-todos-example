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

const updateTodo = (todo) => {
	return apiFetch({
		path: `/wp-todo-api/v1/todo/${todo.id}`,
		method: 'PUT',
		data: { description: todo.description, is_completed: todo.is_completed, due_date: todo.due_date }
	});
}

store( 'iapi-todos', {
	state: {
		new_todo: {
			description: '',
			due_date: ''
		},
		todos: []
	},

	actions: {
		addTodo: function* () {
			const { new_todo } = getContext();
			
			yield addTodo(new_todo.description, false, new_todo.due_date);
		}
	},

	callbacks: {
		helloWorld: () => {
			console.log('Hello world');
		},
		
		updateForm: (event) => {
			const { attributes } = getElement();
			const { new_todo } = getContext();
			const fieldToUpdate = attributes.name;

			if ( fieldToUpdate ) {
				new_todo[fieldToUpdate] = event.target.value;
			}
		},

		toggleComplete: function *(event ) {
			const { todos } = getContext();
			const value = event.target.value;
			const isChecked = event.target.checked;
			const todo = todos.find( todo => String(todo.id) === value );
			
			yield updateTodo({...todo, is_completed: isChecked});
		}
	},
} );
