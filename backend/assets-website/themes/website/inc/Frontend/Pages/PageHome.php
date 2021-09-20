<?php
/**
 * Page Home
 *
 * @package website
 */

namespace App\Frontend\Pages;

/**
 * Retrieve datas for post
 */
class PageHome {
	/**
	 * Return datas of post
	 *
	 * @param mixed $post_id - Id of post.
	 *
	 * @return array
	 */
	public static function datas( $post_id ) {
		$datas = array();

		$datas['seo']['description']    = get_field( 'description', $post_id );
		$datas['header']                = get_field( 'header', $post_id );
		$datas['introduction_services'] = get_field( 'introduction_services', $post_id );
		$datas['services']              = get_field( 'services', $post_id );
		$datas['projects']              = self::get_formatted_projects( get_field( 'projects', $post_id ) );
		$datas['cta_contact']           = get_field( 'cta_contact', $post_id );
		$datas['posts']                 = get_field( 'posts', $post_id );

		$datas['posts']['articles'] = self::get_latest_posts( isset( $datas['posts']['articles'] ) ? $datas['posts']['articles'] : array() );

		return $datas;
	}

	/**
	 * Get formatted latest posts
	 *
	 * @param mixed $latest_posts - Latest Posts.
	 *
	 * @return array
	 */
	public static function get_latest_posts( $latest_posts ) {
		if ( ! isset( $latest_posts ) || empty( $latest_posts ) ) {
			$latest_posts = get_posts(
				array(
					'post_type'   => 'post',
					'numberposts' => 2,
					'orderby'     => 'title',
				)
			);
		}

		$articles = array();

		foreach ( $latest_posts as $key => $article ) {
			$articles[ $key ]['title']            = $article->post_title;
			$articles[ $key ]['slug']             = $article->post_name;
			$articles[ $key ]['thumbnail']['url'] = get_the_post_thumbnail_url( $article );

			$thumbnail_id                         = get_post_thumbnail_id( $article );
			$articles[ $key ]['thumbnail']['alt'] = get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true );

			/**
			* Get categories of post
			*/
			$categories                     = get_the_category( $article->ID );
			$articles[ $key ]['categories'] = array();

			foreach ( $categories as $category ) {
				if ( 1 !== $category->term_id ) {
					$articles[ $key ]['categories'][] = $category->cat_name;
				}
			}

			$articles[ $key ]['author']['name']   = get_the_author_meta( 'display_name', $article->post_author );
			$articles[ $key ]['author']['avatar'] = get_field( 'avatar', 'user_' . $article->post_author );

			$articles[ $key ]['updated_at'] = get_the_modified_date( 'c', $article );
		}

		return $articles;
	}

	/**
	 * Get formatted projects
	 *
	 * @param mixed $project_fields - Fields of project.
	 *
	 * @return array
	 */
	public static function get_formatted_projects( $project_fields ) {
		$datas = array();

		foreach ( $project_fields as $key => $project_field ) {
			if ( 'projects' === $key ) {
				foreach ( $project_field as $_key => $project ) {
					$datas[ $key ][ $_key ]['title']        = $project->post_title;
					$datas[ $key ][ $_key ]['image']        = get_field( 'image', $project->ID );
					$datas[ $key ][ $_key ]['introduction'] = get_field( 'introduction', $project->ID );
					$datas[ $key ][ $_key ]['tags']         = self::get_taxonomy_items( $project->ID, 'project_tag' );
					$datas[ $key ][ $_key ]['date']         = get_field( 'annee', $project->ID );
					$datas[ $key ][ $_key ]['url']          = get_field( 'url', $project->ID );

				}
			} else {
				$datas[ $key ] = $project_field;
			}
		}

		return $datas;
	}

	/**
	 * Get taxonomy items of post
	 *
	 * @param mixed $post_id - Post Id.
	 * @param mixed $taxonomy_slug - Taxonomy Slug.
	 *
	 * @return array
	 */
	public static function get_taxonomy_items( $post_id, $taxonomy_slug ) {
		$datas = array();

		$terms = get_terms(
			array(
				'taxonomy'   => $taxonomy_slug,
				'hide_empty' => false,
			)
		);

		foreach ( $terms as $term ) {
			if ( has_term( $term->name, $taxonomy_slug, get_post( $post_id ) ) ) {
				array_push( $datas, $term->name );
			}
		}

		return $datas;
	}
}


