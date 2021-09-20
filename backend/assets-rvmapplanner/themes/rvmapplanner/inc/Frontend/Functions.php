<?php
/**
 * Global functions for frontend treatement
 *
 * @package rvmapplanner
 */

namespace App\Frontend;

/**
 * Global functions class
 */
class Functions {
	/**
	 * Get Template and return associative class
	 *
	 * @param mixed $template - Template of post.
	 *
	 * @return string
	 */
	public static function template_to_class( $template ) {
		$template = str_replace( '.php', '', $template );
		$template = explode( '-', $template );

		$template = array_map(
			function( $word ) {
				return ucfirst( $word );
			},
			$template
		);

		$template = implode( '', $template );

		return $template;
	}

	/**
	 * Return front url from back
	 *
	 * @param mixed $post_id - Post id.
	 *
	 * @return string
	 */
	public static function get_front_url( $post_id ) {
		$host = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'];
		$link = get_permalink( $post_id );

		return str_replace( $host, FRONTEND_URL, $link );
	}
}
