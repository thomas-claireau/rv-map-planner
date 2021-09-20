<?php
/**
 * Page Api Setup
 *
 * @package rvmapplanner
 */

use App\Frontend\Pages;

add_action( 'rest_api_init', 'rvmapplanner_page_api' );

if ( ! function_exists( 'rvmapplanner_page_api' ) ) :
	/**
	 * Register page api
	 *
	 * @return void
	 */
	function rvmapplanner_page_api() {
		register_rest_route(
			get_stylesheet() . '/v1',
			'/pages/',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => 'rvmapplanner_page_api_callback',
				'permission_callback' => '__return_true',
			),
		);
	}
endif;

if ( ! function_exists( 'rvmapplanner_page_api_callback' ) ) :
	/**
	 * Callback of page api
	 *
	 * @param Request $request - Request.
	 */
	function rvmapplanner_page_api_callback( $request ) {
		header( 'Access-Control-Allow-Origin: ' . FRONTEND_URL );
		header( 'content-type:application/json' );

		$datas   = array();
		$post_id = $request->get_param( 'post_id' );

		if ( is_null( $post_id ) || '' === $post_id ) {
			return wp_send_json( array( 'error' => 'Enter a valid page ID' ), 403 );
		}

		$post = get_post( $post_id );

		if ( is_null( $post ) ) {
			return wp_send_json( array( 'error' => 'Page not found' ), 404 );
		}

		if ( 'page' !== $post->post_type ) {
			return wp_send_json( array( 'error' => 'Please enter page ID' ), 403 );
		}

		$class = 'App\\Frontend\\Pages\\' . Pages::call_page_class( $post->ID );

		if ( ! class_exists( $class ) ) {
			return wp_send_json( array( 'error' => 'Page not found' ), 404 );
		}

		$datas = call_user_func_array( array( $class, 'datas' ), array( $post->ID ) );

		wp_send_json( $datas );
	}
endif;
