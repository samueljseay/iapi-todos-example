<?php
/**
 * Plugin Name:       Todolist
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       todolist
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function todolist_todolist_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'todolist_todolist_block_init' );

function initialize_todo_list_sample_data() {
	if (false === get_transient('my_todo_list')) {
			$sample_todos = array(
					array('id' => 0, 'is_completed' => false, 'description' => 'Install WordPress', 'due_date' => '2024-04-01'),
					array('id' => 1, 'is_completed' => true, 'description' => 'Create a new plugin', 'due_date' => '2024-04-02'),
					array('id' => 2, 'is_completed' => false, 'description' => 'Learn about WP REST API', 'due_date' => '2024-04-03'),
			);
			set_transient('my_todo_list', $sample_todos, DAY_IN_SECONDS);
	}
}

add_action('init', 'initialize_todo_list_sample_data');

function my_todo_list_register_routes() {
	register_rest_route('wp-todo-api/v1', '/todo/(?P<id>\d+)', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => 'my_todo_list_get_todo',
			'permission_callback' => '__return_true',
	));
	register_rest_route('wp-todo-api/v1', '/todo', array(
			'methods' => WP_REST_Server::CREATABLE,
			'callback' => 'my_todo_list_create_todo',
			'permission_callback' => '__return_true',
	));
	register_rest_route('wp-todo-api/v1', '/todo/(?P<id>\d+)', array(
			'methods' => WP_REST_Server::EDITABLE,
			'callback' => 'my_todo_list_update_todo',
			'permission_callback' => '__return_true',
	));
	register_rest_route('wp-todo-api/v1', '/todo/(?P<id>\d+)', array(
			'methods' => WP_REST_Server::DELETABLE,
			'callback' => 'my_todo_list_delete_todo',
			'permission_callback' => '__return_true',
	));
	register_rest_route('wp-todo-api/v1', '/todos', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => 'my_todo_list_get_todos',
			'permission_callback' => '__return_true',
	));
}

add_action('rest_api_init', 'my_todo_list_register_routes');

function my_todo_list_get_todo($data) {
	$todos = get_transient('my_todo_list');
	foreach ($todos as $todo) {
			if ($todo['id'] == $data['id']) {
					return new WP_REST_Response($todo, 200);
			}
	}
	return new WP_Error('todo_not_found', 'Todo not found', array('status' => 404));
}

function my_todo_list_get_todos() {
	$todos = get_transient('my_todo_list');
	return new WP_REST_Response($todos, 200);
}

function my_todo_list_create_todo($request) {
	$todos = get_transient('my_todo_list');
	$todo = $request->get_json_params();
	$todo['id'] = end($todos)['id'] + 1;
	$todos[] = $todo;
	set_transient('my_todo_list', $todos, DAY_IN_SECONDS);
	return new WP_REST_Response($todo, 201);
}

function my_todo_list_update_todo($data) {
	$todos = get_transient('my_todo_list');
	foreach ($todos as &$todo) {
			if ($todo['id'] == $data['id']) {
					$input = $data->get_json_params();
					if (isset($input['is_completed'])) $todo['is_completed'] = $input['is_completed'];
					if (isset($input['description'])) $todo['description'] = $input['description'];
					if (isset($input['due_date'])) $todo['due_date'] = $input['due_date'];
					set_transient('my_todo_list', $todos, DAY_IN_SECONDS);
					return new WP_REST_Response($todo, 200);
			}
	}
	return new WP_Error('todo_not_found', 'Todo not found', array('status' => 404));
}

function my_todo_list_delete_todo($data) {
	$todos = get_transient('my_todo_list');
	foreach ($todos as $key => $todo) {
			if ($todo['id'] == $data['id']) {
					unset($todos[$key]);
					$todos = array_values($todos); // Reindex array
					set_transient('my_todo_list', $todos, DAY_IN_SECONDS);
					return new WP_REST_Response(true, 200);
			}
	}
	return new WP_Error('todo_not_found', 'Todo not found', array('status' => 404));
}

