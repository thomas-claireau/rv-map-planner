<?php
/**
 * Setup of API
 *
 * @package rvmapplanner
 */

/**
 * Autoload
 *
 * @param mixed $classname - classname of mvc project.
 *
 * @return void
 */
function app_autoload( $classname ) {
	$class      = str_replace( '\\', DIRECTORY_SEPARATOR, $classname );
	$class_path = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . $class . '.php';
	$class_path = str_replace( 'App/', '', $class_path );

	$class_array = explode( '\\', $classname );

	$class_name = strtolower( array_pop( $class_array ) );
	$folder     = strtolower( implode( DIRECTORY_SEPARATOR, $class_array ) );
	$real_path  = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . $folder . DIRECTORY_SEPARATOR . $class_name . '.php';

	if ( file_exists( $class_path ) ) {
		include_once $class_path;
	} elseif ( file_exists( $real_path ) ) {
		include_once $real_path;
	}
}

spl_autoload_register( 'app_autoload' );

/**
 * Add custom api endpoint
 */
require_once get_template_directory() . '/api/global.php';
require_once get_template_directory() . '/api/routes.php';
require_once get_template_directory() . '/api/pages.php';
require_once get_template_directory() . '/api/posts.php';
