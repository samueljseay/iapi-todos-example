import { store } from '@wordpress/interactivity';

store( 'iapi-todos', {
	actions: {
		// Add some magic here!
	},
	callbacks: {
		// Add some magic here!
		helloWorld: () => {
			console.log( 'Hello World!' );
		},
	},
} );
