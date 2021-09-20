<?php
/**
 * Post Api Setup
 *
 * @package website
 */

use App\Frontend\Posts;

add_action( 'rest_api_init', 'website_post_api' );

if ( ! function_exists( 'website_post_api' ) ) :
	/**
	 * Register page api
	 *
	 * @return void
	 */
	function website_post_api() {
		register_rest_route(
			get_stylesheet() . '/v1',
			'/posts/',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => 'website_post_api_callback',
				'permission_callback' => '__return_true',
			),
		);
	}
endif;

if ( ! function_exists( 'website_post_api_callback' ) ) :
	/**
	 * Callback of page api
	 *
	 * @param mixed $request - Request.
	 */
	function website_post_api_callback( $request ) {
		header( 'Access-Control-Allow-Origin: ' . FRONTEND_URL );
		header( 'content-type:application/json' );

		$datas = array();

		$args = array(
			'name'        => $request->get_param( 'slug' ),
			'numberposts' => $request->get_param( 'limit' ) ? (int) $request->get_param( 'limit' ) : -1,
			'post_type'   => 'post',
			'post_status' => 'publish',
			'orderby'     => 'title',
		);

		$posts = get_posts( $args );

		foreach ( $posts as $post ) {
			$class = 'App\\Frontend\\Posts\\' . Posts::call_post_class( $post->post_type );

			$datas[] = call_user_func_array( array( $class, 'datas' ), array( $post->ID ) );
		}

		wp_send_json( $datas );
	}
endif;
