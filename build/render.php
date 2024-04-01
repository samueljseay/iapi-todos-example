<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$todos = get_transient('my_todo_list');

?>
<div 	
	<?php echo get_block_wrapper_attributes(); ?>	
>
	<?php if (!empty($todos)): ?>
		<ul>
				<label>Add new todo:</label>
				<input type="text" />
				<input type="date" />
				<button>Add</button>
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
