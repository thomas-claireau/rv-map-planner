<?php
/**
 * Pages controller
 *
 * @package website
 */

namespace App\Frontend;

use App\Frontend\Functions;

/**
 * Pages Class
 */
class Pages {
	/**
	 * Get post id and return associative class
	 *
	 * @param null $post_id - Id of post.
	 *
	 * @return string
	 */
	public static function call_page_class( $post_id = null ) {
		if ( (int) get_option( 'page_on_front' ) === $post_id ) {
			return 'PageHome';
		}

		$template = get_page_template_slug( $post_id );
		$class    = Functions::template_to_class( $template );

		return $class;
	}
}
