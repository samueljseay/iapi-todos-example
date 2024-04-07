<?php

$todos = get_transient('my_todo_list');

// Needed later.
wp_enqueue_script('wp-api-fetch');

?>
<div 
	data-wp-interactive="iapi-todos"	
	data-wp-init="callbacks.helloWorld"
	<?php echo get_block_wrapper_attributes(); ?>	
>
	<p >
		<?php if (!empty($todos)): ?>
			<ul>
					<label>Add new todo:</label>
					<input type="text" />
					<input type="date" />
					<button>Add</button>
					
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
