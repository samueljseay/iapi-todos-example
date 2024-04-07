import { store, getElement, getContext } from '@wordpress/interactivity';

store( 'iapi-todos', {
	actions: {
		// Add some magic here!
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
	},
} );
