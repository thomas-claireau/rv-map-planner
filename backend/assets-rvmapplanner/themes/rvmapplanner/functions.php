<?php
/**
 * Thomas Claireau functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package rvmapplanner
 */

if ( ! function_exists( 'rvmapplanner_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function rvmapplanner_setup() {
		/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on Digital Factory, use a find and replace
		* to change 'vivendi_rse' to the name of your theme in all the template files.
		*/
		load_theme_textdomain( 'rvmapplanner', get_template_directory() . '/languages' );

		/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );

		/*
		* Register menu
		*/
		register_nav_menus(
			array(
				'main-menu'   => esc_html__( 'Main', 'rvmapplanner' ),
				'footer-menu' => esc_html__( 'Footer', 'rvmapplanner' ),
			)
		);
	}
endif;

add_action( 'after_setup_theme', 'rvmapplanner_setup' );

/**
 * Setup autoload
 */
require_once get_template_directory() . '/inc/setup.php';

/**
 * Custom posts
 */
require_once get_template_directory() . '/inc/custom-posts/sample.php';

/**
 * Acf settings
 */
require_once get_template_directory() . '/inc/acf-settings.php';

/**
 * Acf filters
 */
require_once get_template_directory() . '/inc/acf-filters.php';

/**
 * Seopress enable preview
 */
require_once get_template_directory() . '/inc/seopress-filters.php';

/**
 * Frontend redirection
 *
 * @param mixed $id - Id of post.
 *
 * @return mixed
 */
function frontend_redirect( $id ) {
	$name      = get_post_field( 'post_name', $id );
	$type      = get_post_type( $id );
	$permalink = FRONTEND_URL;

	if ( ! is_front_page() ) {
		$permalink .= 'page' !== $type ? "/$type/" : '/';
		$permalink .= $name;
	}

	header( 'Location: ' . $permalink );
	exit();
}

