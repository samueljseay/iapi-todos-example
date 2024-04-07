<?php

$todos = get_transient('my_todo_list');

// Needed later.
wp_enqueue_script('wp-api-fetch');

$context = array(
	'new_todo' => array(
		'description' => '',
		'due_date' => '',
	),
	'todos' => $todos,
	'formIsProcessing' => false,
	'errorMessage' => false,
);

?>
<div 
	data-wp-interactive="iapi-todos"	
	data-wp-init="callbacks.helloWorld"
	<?php echo get_block_wrapper_attributes(); ?>	
	<?php echo wp_interactivity_data_wp_context( $context ); ?>
>		
	<ul>
		<div data-wp-bind--hidden="context.formIsProcessing">
			<label>Add new todo:</label>
			<input type="text" name="description" data-wp-on--input="callbacks.updateForm" data-wp-bind--value="context.new_todo.description" />
			<input type="date" name="due_date" data-wp-on--input="callbacks.updateForm" data-wp-bind--value="context.new_todo.due_date" />
			<button data-wp-on--click="actions.addTodo">Add</button>
			<hr />
		</div>

		<div data-wp-bind--hidden="!context.formIsProcessing">Adding new todo...</div>

		<div data-wp-bind--hidden="!context.errorMessage">
			<p>Something went wrong. <span data-wp-text="context.errorMessage"></span></p>
		</div>
		
		<template data-wp-each="context.todos">
			<li>
				<span data-wp-text="context.item.description"></span> -
				<strong data-wp-bind--hidden="context.item.is_completed">Pending</strong>
				<strong data-wp-bind--hidden="!context.item.is_completed">Completed</strong> -
				Due: <span data-wp-text="context.item.due_date"></span>

				<div>
					<label>Mark as completed: </label>
					<input data-wp-bind--checked="context.item.is_completed" type="checkbox" />
				</div>
				<hr />
			</li>	
		</template>
	</ul>	
</div>
