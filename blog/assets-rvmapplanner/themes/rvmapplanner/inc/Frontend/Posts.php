<?php
/**
 * Posts controller
 *
 * @package rvmapplanner
 */

namespace App\Frontend;

use App\Frontend\Functions;

/**
 * Posts Class
 */
class Posts {
	/**
	 * Get post id and return associative class
	 *
	 * @param null $post_type - Id of post.
	 *
	 * @return string
	 */
	public static function call_post_class( $post_type = null ) {
		return ucfirst( $post_type );
	}
}
