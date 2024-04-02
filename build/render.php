<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$todos = get_transient('my_todo_list');

$context = array(
	'new_todo' => array(
		'description' => '',
		'due_date' => '',
	),
	'todos' => $todos,
	'formIsProcessing' => false,
	'errorMessage' => false,
)

?>
<div 	
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="iapi-todos"
	data-wp-init="callbacks.helloWorld"
	<?php echo wp_interactivity_data_wp_context( $context ); ?>
>
	<?php if (!empty($todos)): ?>
		<ul>
				<div data-wp-bind--hidden="state.formIsProcessing">
					<label>Add new todo:</label>
					<input type="text" name="description" data-wp-on--input="callbacks.updateForm" data-wp-bind--value="state.new_todo.description" />
					<input type="date" name="due_date" data-wp-on--input="callbacks.updateForm" data-wp-bind--value="state.new_todo.due_date" />
					<button data-wp-on--click="actions.addTodo">Add</button>
					<hr />
				</div>

				<div data-wp-bind--hidden="!state.formIsProcessing">Adding new todo...</div>

				<div data-wp-bind--hidden="!state.errorMessage">
					<p>Something went wrong. <span data-wp-text="state.errorMessage"></span></p>
				</div>
				
				<?php foreach ($todos as $todo): ?>
						<li>
								<?php echo esc_html($todo['description']); ?> - 
								<strong><?php echo $todo['is_completed'] ? esc_html__('Completed', 'todolist') : esc_html__('Pending', 'todolist'); ?></strong> - 
								Due: <?php echo esc_html($todo['due_date']); ?>

								<div>
									<label>Mark as completed: </label>
									<input data-wp-on--change="callbacks.toggleComplete" value="<?php echo $todo['id']; ?>" type="checkbox" <?php echo $todo['is_completed'] ? 'checked' : ''; ?> />
								</div>

								<hr />
						</li>
				<?php endforeach; ?>
		</ul>
	<?php else: ?>
			<p><?php esc_html_e('No todos found.', 'todolist'); ?></p>
	<?php endif; ?>
</div>
