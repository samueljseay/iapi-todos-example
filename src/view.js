/**
 * WordPress dependencies
 */
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

const updateTodo = (todo) => {
	return apiFetch({
		path: `/wp-todo-api/v1/todo/${todo.id}`,
		method: 'PUT',
		data: { description: todo.description, is_completed: todo.is_completed, due_date: todo.due_date }
	});
}

store( 'iapi-todos', {
	state: {
		get new_todo() {
			return getContext().new_todo; 
		},
		
		get todos() {
			return getContext().todos;
		},
		
		get formIsProcessing() {
			return getContext().formIsProcessing;
		},

		get errorMessage() {
			return getContext().errorMessage;
		}
	},

	actions: {
		addTodo: function* () {
			getContext().formIsProcessing = true;
			
			const { new_todo } = getContext();
			
			try {
				yield artificialDelay(1000);
				yield addTodo(new_todo.description, false, new_todo.due_date);
			} catch (error) {
				getContext().errorMessage = `Could not add TODO: ${error.message}`;
			}
			
			getContext().formIsProcessing = false;
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
			getContext().formIsProcessing = true;
			
			const value = event.target.value;
			const isChecked = event.target.checked;
			const todo = getContext().todos.find( todo => String(todo.id) === value );

			try {
				yield artificialDelay(1000);
				yield updateTodo({...todo, is_completed: isChecked});
			} catch (error) {
				getContext().errorMessage = `Could not update TODO: ${error.message}`;
			}

			getContext().formIsProcessing = false;
		}
	},
} );
