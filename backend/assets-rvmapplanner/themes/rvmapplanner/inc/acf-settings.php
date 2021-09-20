<?php
/**
 * Add acf settings for ACF Free
 * https://akzhy.com/blog/create-options-page-in-wordpress-using-free-acf
 *
 * @package rvmapplanner
 */

add_filter( 'use_block_editor_for_post', 'disable_gutemberg_on_specific_pages', 5, 2 );
add_action( 'pre_get_posts', 'hide_settings_page' );
add_action( 'admin_menu', 'add_site_settings_to_menu' );
add_filter( 'parent_file', 'highlight_custom_settings_page' );

/**
 * Disable Gutemberg on specific page
 *
 * @param mixed $can - Can.
 * @param mixed $post - Post.
 *
 * @return mixed
 */
function disable_gutemberg_on_specific_pages( $can, $post ) {
	$exclude_pages = array(
		'site-settings',
		'accueil',
		'blog',
	);

	if ( $post ) {
		if ( in_array( $post->post_name, $exclude_pages, true ) ) {
			return false;
		}
	}
	return $can;
}

/**
 * Hide settings page from the list
 *
 * @param mixed $query - Query.
 *
 * @return null
 */
function hide_settings_page( $query ) {
	if ( ! is_admin() && ! $query->is_main_query() ) {
		return;
	}
	global $typenow;
	if ( 'page' === $typenow ) {
		$settings_page = get_page_by_path( 'site-settings', null, 'page' );

		if ( $settings_page ) {
			$query->set( 'post__not_in', array( $settings_page->ID ) );
		}
	}

	return null;
}

/**
 * Add the page to admin menu
 *
 * @return mixed
 */
function add_site_settings_to_menu() {
	$settings_page = get_page_by_path( 'site-settings', null, 'page' );

	if ( $settings_page ) {
		add_menu_page(
			'Site Settings',
			'Site Setttings',
			'manage_options',
			'post.php?post=' . $settings_page->ID . '&action=edit',
			'',
			'dashicons-admin-tools',
			20
		);
	}

}

/**
 * Change the active menu item
 *
 * @param mixed $file - File.
 *
 * @return mixed
 */
function highlight_custom_settings_page( $file ) {
	global $pagenow;

	$settings_page = get_page_by_path( 'site-settings', null, 'page' );
	$post          = (int) filter_input( INPUT_GET, 'post' );

	if ( $settings_page && 'post.php' === $pagenow && $post === $settings_page->ID ) {
		$file = "post.php?post=$settings_page&action=edit";
	}
	return $file;
}

/**
 * Get field from slug
 *
 * @param mixed $slug - Slug of the page settings.
 *
 * @return int
 */
function op( $slug ) {
	$page_url_id = get_page_by_path( $slug );

	return $page_url_id ? $page_url_id->ID : null;
}
