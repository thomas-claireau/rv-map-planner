<?php
/**
 * Post
 *
 * @package website
 */

namespace App\Frontend\Posts;

use App\Frontend\Functions;

/**
 * Retrieve datas for post
 */
class Post {
	/**
	 * Return datas of post
	 *
	 * @param mixed $post_id - Id of post.
	 *
	 * @return array
	 */
	public static function datas( $post_id ) {
		$datas = array();
		$post  = get_post( $post_id );

		if ( is_null( $post ) ) {
			return null;
		}

		$datas                       = self::get_formatted_post_datas( $post );
		$datas['seo']['description'] = get_field( 'description', $post_id );
		$datas['seo']['canonical']   = Functions::get_front_url( $post_id );
		$datas['related_posts']      = self::get_related_posts( $post->ID );

		return $datas;
	}

	/**
	 * Return formatted post datas
	 *
	 * @param object $post - post object.
	 *
	 * @return array
	 */
	public static function get_formatted_post_datas( $post ) {
		$datas = array();

		$datas['id']               = $post->ID;
		$datas['slug']             = $post->post_name;
		$datas['title']            = $post->post_title;
		$datas['thumbnail']['url'] = get_the_post_thumbnail_url( $post );

		$thumbnail_id              = get_post_thumbnail_id( $post->ID );
		$datas['thumbnail']['alt'] = get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true );

		$datas['author']['name']   = get_the_author_meta( 'display_name', $post->post_author );
		$datas['author']['avatar'] = get_field( 'avatar', 'user_' . $post->post_author );

		$datas['created_at'] = get_the_date( 'c', $post );
		$datas['updated_at'] = get_the_modified_date( 'c', $post );

		$datas['content'] = $post->post_content;

		$datas['categories'] = self::get_categories_post( $post->ID );

		return $datas;
	}

	/**
	 * Get categories of post
	 *
	 * @param mixed $post_id - Post Id.
	 *
	 * @return array
	 */
	public static function get_categories_post( $post_id ) {
		$datas      = array();
		$categories = get_the_category( $post_id );

		foreach ( $categories as $category ) {
			if ( 1 !== $category->term_id ) {
				$datas[] = $category->cat_name;
			}
		}

		return $datas;
	}

	/**
	 * Get related posts (by categs)
	 *
	 * @param string $post_id - Id of post.
	 *
	 * @return array
	 */
	public static function get_related_posts( $post_id ) {
		$categories_id = array_filter(
			wp_get_post_categories( $post_id ),
			function( $category_id ) {
				return 1 !== $category_id;
			}
		);

		$related_posts = get_posts(
			array(
				'category__in' => $categories_id,
				'post__not_in' => array( $post_id ),
				'numberposts'  => 2,
			)
		);

		$related_posts = array_map(
			function( $post ) {
				return self::get_formatted_post_datas( $post );
			},
			$related_posts
		);

		switch ( true ) {
			case count( $related_posts ) === 1:
				array_push(
					$related_posts,
					self::get_formatted_post_datas(
						get_posts(
							array(
								'post__not_in' => array( $post_id, $related_posts[0]['id'] ),
								'numberposts'  => 1,
							)
						)[0]
					)
				);

				break;
			case empty( $related_posts ):
				$related_posts = array_map(
					function( $post ) {
						return self::get_formatted_post_datas( $post );
					},
					get_posts(
						array(
							'post__not_in' => array( $post_id ),
							'numberposts'  => 2,
						)
					)
				);

				break;
		}

		return $related_posts;
	}
}

