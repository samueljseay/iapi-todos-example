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
				<label>Add new todo:</label>
				<input type="text" name="description" data-wp-on--input="callbacks.updateTodo" data-wp-bind--value="state.new_todo.description" />
				<input type="date" name="due_date" data-wp-on--input="callbacks.updateTodo" data-wp-bind--value="state.new_todo.due_date" />
				<button data-wp-on--click="actions.addTodo">Add</button>
				<hr />
				
				<?php foreach ($todos as $todo): ?>
						<li>
								<?php echo esc_html($todo['description']); ?> - 
								<strong><?php echo $todo['is_completed'] ? esc_html__('Completed', 'todolist') : esc_html__('Pending', 'todolist'); ?></strong> - 
								Due: <?php echo esc_html($todo['due_date']); ?>

								<div>
									<label>Mark as completed: </label>
									<input type="checkbox" <?php echo $todo['is_completed'] ? 'checked' : ''; ?> />
								</div>

								<hr />
						</li>
				<?php endforeach; ?>
		</ul>
	<?php else: ?>
			<p><?php esc_html_e('No todos found.', 'todolist'); ?></p>
	<?php endif; ?>
</div>
