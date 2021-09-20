<?php
/**
 * Routes Api Setup
 *
 * @package website
 */

add_action( 'rest_api_init', 'website_routes_api' );

if ( ! function_exists( 'website_routes_api' ) ) :
	/**
	 * Register routes api
	 *
	 * @return void
	 */
	function website_routes_api() {
		register_rest_route(
			get_stylesheet() . '/v1',
			'/routes/',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => 'website_routes_api_callback',
				'permission_callback' => '__return_true',
			),
		);
	}
endif;

if ( ! function_exists( 'website_routes_api_callback' ) ) :
	/**
	 * Callback of routes api
	 *
	 * @return void
	 */
	function website_routes_api_callback() {
		header( 'Access-Control-Allow-Origin: ' . FRONTEND_URL );
		header( 'content-type:application/json' );

		$data = array();

		/**
		 * Home page
		 */
		$home_id = (int) get_option( 'page_on_front' );

		$data[] = array(
			'post_id'  => $home_id,
			'template' => 'Template Home',
		);

		$page_associations = array(
			'page-news.php'    => 'Template Actualités',
			'page-contact.php' => 'Template Contact',
		);

		$args = array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'meta_key'    => '_wp_page_template',
			'meta_value'  => array_keys( $page_associations ),
			'nopaging'    => true,
		);

		$pages = get_posts( $args );

		foreach ( $pages as $page ) {
			$data[] = array(
				'post_id'  => $page->ID,
				'template' => $page_associations[ get_page_template_slug( $page->ID ) ],
			);
		}

		$post_associations = array(
			'post'    => 'Template Article',
			'project' => 'Template Project',
		);

		$args = array(
			'post_type'   => array_keys( $post_associations ),
			'post_status' => 'publish',
			'nopaging'    => true,
		);

		$posts = get_posts( $args );

		foreach ( $posts as $post ) {
			$data[] = array(
				'post_id'  => $post->ID,
				'template' => $post_associations[ $post->post_type ],
			);
		}

		wp_send_json( $data );
	}
endif;
