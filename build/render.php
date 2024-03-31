<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$todos = get_transient('my_todo_list');

?>
<div 
	data-wp-interactive="iapi-todos"
>
	<p <?php echo get_block_wrapper_attributes(); ?>>
		<?php if (!empty($todos)): ?>
			<ul>
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
