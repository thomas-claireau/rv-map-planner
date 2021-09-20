<?php
/**
 * Configuration of custom post type project
 *
 * @package rvmapplanner
 */

/**
 * Create post and taxonomy
 */
add_action( 'init', 'project_init' );
add_action( 'init', 'create_taxonomy_project_tag', 0 );

if ( ! function_exists( 'project_init' ) ) {
	/**
	 * Init custom post type project
	 *
	 * @return mixed
	 */
	function project_init() {
		register_post_type(
			'project',
			array(
				'labels'                => array(
					'name'               => __( 'Samples' ),
					'singular_name'      => __( 'Projet' ),
					'all_items'          => __( 'Tous les projets' ),
					'new_item'           => __( 'Nouveau projet' ),
					'add_new'            => __( 'Ajouter' ),
					'add_new_item'       => __( 'Ajouter un projet' ),
					'edit_item'          => __( 'Modifier' ),
					'view_item'          => __( 'Voir' ),
					'search_items'       => __( 'Rechercher un projet' ),
					'not_found'          => __( 'Pas de projet' ),
					'not_found_in_trash' => __( 'Pas de projet' ),
					'parent_item_colon'  => __( 'Projet parent' ),
					'menu_name'          => __( 'Samples' ),
				),
				'public'                => true,
				'hierarchical'          => false,
				'show_ui'               => true,
				'show_in_nav_menus'     => true,
				'supports'              => array( 'title' ),
				'has_archive'           => true,
				'rewrite'               => true,
				'query_var'             => true,
				'menu_icon'             => 'dashicons-groups',
				'show_in_rest'          => true,
				'rest_base'             => 'press',
				'rest_controller_class' => 'WP_REST_Posts_Controller',
				'menu_position'         => 5,
			)
		);
	}
}

if ( ! function_exists( 'create_taxonomy_project_tag' ) ) :
	/**
	 * Create taxonomy of custom post type
	 *
	 * @return mixed
	 */
	function create_taxonomy_project_tag() {
		$labels = array(
			'name'                       => _x( 'Tags', 'taxonomy general name', 'rvmapplanner' ),
			'singular_name'              => _x( 'Tag', 'taxonomy singular name', 'rvmapplanner' ),
			'search_items'               => __( 'Recherche', 'rvmapplanner' ),
			'popular_items'              => __( 'Tags populaires', 'rvmapplanner' ),
			'all_items'                  => __( 'Tous les tags', 'rvmapplanner' ),
			'parent_item'                => null,
			'parent_item_colon'          => null,
			'edit_item'                  => __( 'Editer le tag', 'rvmapplanner' ),
			'update_item'                => __( 'Editer le tag', 'rvmapplanner' ),
			'add_new_item'               => __( 'Ajouter un tag', 'rvmapplanner' ),
			'new_item_name'              => __( 'Nouveau tag', 'rvmapplanner' ),
			'separate_items_with_commas' => __( 'Séparer les tags par une virgule', 'rvmapplanner' ),
			'add_or_remove_items'        => __( 'Ajouter ou supprimer un tag', 'rvmapplanner' ),
			'choose_from_most_used'      => __( 'Choisir parmi les tags les plus visités', 'rvmapplanner' ),
			'not_found'                  => __( 'Aucun tag trouvé', 'rvmapplanner' ),
			'menu_name'                  => __( 'Tags', 'rvmapplanner' ),
		);

		$args = array(
			'hierarchical'          => true,
			'labels'                => $labels,
			'show_ui'               => true,
			'show_admin_column'     => true,
			'update_count_callback' => '_update_post_term_count',
			'query_var'             => true,
			'rewrite'               => array( 'slug' => 'project_tag' ),
		);

		register_taxonomy( 'project_tag', array( 'project' ), $args );
	}
endif;
