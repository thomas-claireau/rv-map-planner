<?php
/**
 * Page News
 *
 * @package website
 */

namespace App\Frontend\Pages;

use App\Frontend\Functions;

/**
 * Retrieve datas for post
 */
class PageNews {
	/**
	 * Return datas of post
	 *
	 * @param mixed $post_id - Id of post.
	 *
	 * @return array
	 */
	public static function datas( $post_id ) {
		$datas = array();

		$post = get_post( $post_id );

		$datas['seo']['title']       = get_the_title( $post_id );
		$datas['seo']['description'] = get_field( 'description', $post_id );
		$datas['seo']['canonical']   = Functions::get_front_url( $post_id );
		$datas['seo']['author_name'] = get_the_author_meta( 'display_name', $post->post_author );

		$datas['created_at'] = get_the_date( 'c', $post_id );
		$datas['updated_at'] = get_the_modified_date( 'c', $post_id );

		return $datas;
	}
}
