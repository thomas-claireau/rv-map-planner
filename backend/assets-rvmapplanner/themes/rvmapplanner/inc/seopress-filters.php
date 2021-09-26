<?php
/**
 * Seopress enable preview
 *
 * @package rvmapplanner
 */

/**
 * Seo press enable preview
 *
 * @param mixed $args - Seo press args.
 *
 * @return mixed
 */
function sp_real_preview_remote( $args ) {
	$args['headers'] = array( 'Authorization' => 'Basic ' . base64_encode( BACKEND_USERNAME . ':' . BACKEND_PASSWORD ) );
	return $args;
}

add_filter( 'seopress_real_preview_remote', 'sp_real_preview_remote' );
