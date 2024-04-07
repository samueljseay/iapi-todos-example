<?php

$todos = get_transient('my_todo_list');

// Needed later.
wp_enqueue_script('wp-api-fetch');

$context = array(
	'new_todo' => array(
		'description' => '',
		'due_date' => '',
	)
);

?>
<div 
	data-wp-interactive="iapi-todos"	
	data-wp-init="callbacks.helloWorld"
	<?php echo get_block_wrapper_attributes(); ?>	
	<?php echo wp_interactivity_data_wp_context( $context ); ?>
>
	<p >
		<?php if (!empty($todos)): ?>
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
					
					<?php foreach ($todos as $todo): ?>
							<li>
									<?php echo esc_html($todo['description']); ?> - 
									<strong><?php echo $todo['is_completed'] ? esc_html__('Completed', 'todolist') : esc_html__('Pending', 'todolist'); ?></strong> - 
									Due: <?php echo esc_html($todo['due_date']); ?>
							</li>
					<?php endforeach; ?>
			</ul>
		<?php else: ?>
				<p><?php esc_html_e('No todos found.', 'todolist'); ?></p>
		<?php endif; ?>	
	</p>
</div>
