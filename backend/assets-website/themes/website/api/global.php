<?php
/**
 * Global Api Setup
 *
 * @package website
 */

use App\Frontend\Functions;
use App\Frontend\Menu;

add_action( 'rest_api_init', 'website_global_api' );

if ( ! function_exists( 'website_global_api' ) ) :
	/**
	 * Register global api
	 *
	 * @return void
	 */
	function website_global_api() {
		register_rest_route(
			get_stylesheet() . '/v1',
			'/global/',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => 'website_global_api_callback',
				'permission_callback' => '__return_true',
			),
		);
	}
endif;

if ( ! function_exists( 'website_global_api_callback' ) ) :
	/**
	 * Callback of global api
	 *
	 * @return void
	 */
	function website_global_api_callback() {
		header( 'Access-Control-Allow-Origin: ' . FRONTEND_URL );
		header( 'content-type:application/json' );

		$data = array();

		$data['header'] = get_field( 'header', op( 'site-settings' ) );
		$data['footer'] = get_field( 'footer', op( 'site-settings' ) );

		$data['header']['menus'] = Menu::get_menus_as_array( 'main' );
		$data['footer']['menus'] = Menu::get_menus_as_array( 'footer' );

		$data['seo']['site_name'] = get_bloginfo( 'name' );
		$data['seo']['home_url']  = FRONTEND_URL;

		wp_send_json( $data );
	}
endif;
