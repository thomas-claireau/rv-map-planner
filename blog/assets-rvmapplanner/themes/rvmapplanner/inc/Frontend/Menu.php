<?php
/**
 * Api Class Menu
 *
 * @package rvmapplanner
 */

namespace App\Frontend;

/**
 * Class Menu to get WordPress menu
 */
class Menu {


	/**
	 * Array of menu
	 *
	 * @var mixed
	 */
	private static $menu;

	/**
	 * Slug of menu (main or footer).
	 *
	 * @var string
	 */
	private static $slug;

	/**
	 * Return array of menu
	 *
	 * @param Slug $slug - Slug of menu (main or footer).
	 *
	 * @return array
	 */
	public static function get_menus_as_array( $slug = '' ) {
		self::$slug = $slug;
		self::get_menus();

		return self::$menu;
	}

	/**
	 * Get menus
	 *
	 * @return mixed
	 */
	public static function get_menus() {
		$locations = get_nav_menu_locations();

		$target_location = isset( $locations[ self::$slug . '-menu' ] ) ? $locations[ self::$slug . '-menu' ] : null;

		if ( $target_location ) {
			self::$menu = self::get_menu( $target_location );
		} else {
			foreach ( $locations as $key => $location ) {
				self::$menu[ $key ] = self::get_menu( $location );
			}
		}
	}

	/**
	 * Get menu of WordPress
	 *
	 * @param Id $id - Id of menu.
	 *
	 * @return array
	 */
	public static function get_menu( $id ) {
		$menu = wp_get_nav_menu_object( $id );

		$data = array();

		$data['id']    = $id;
		$data['name']  = $menu->name;
		$data['items'] = self::get_recursively_menu_items( $id );

		return $data;
	}

	/**
	 * Get items of menu (+ children)
	 *
	 * @param Id $id - Id of menu.
	 *
	 * @return array
	 */
	public static function get_recursively_menu_items( $id ) {
		$menu_items = wp_get_nav_menu_items( $id );
		$data       = array();

		foreach ( $menu_items as $key => $menu_item ) {
			$data[ $key ] = self::render_menu_items( $menu_item );
		}

		return $data;
	}

	/**
	 * Render menu items
	 *
	 * @param object $menu_item - Menu item object.
	 *
	 * @return array
	 */
	public static function render_menu_items( $menu_item ) {
		$data = array();

		$data['title']  = $menu_item->title;
		$data['url']    = $menu_item->url;
		$data['target'] = $menu_item->target;
		$data['class']  = implode( ' ', $menu_item->classes );

		return $data;
	}
}
