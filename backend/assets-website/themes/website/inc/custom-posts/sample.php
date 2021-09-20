<?php
/**
 * Configuration of custom post type project
 *
 * @package website
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
			'name'                       => _x( 'Tags', 'taxonomy general name', 'website' ),
			'singular_name'              => _x( 'Tag', 'taxonomy singular name', 'website' ),
			'search_items'               => __( 'Recherche', 'website' ),
			'popular_items'              => __( 'Tags populaires', 'website' ),
			'all_items'                  => __( 'Tous les tags', 'website' ),
			'parent_item'                => null,
			'parent_item_colon'          => null,
			'edit_item'                  => __( 'Editer le tag', 'website' ),
			'update_item'                => __( 'Editer le tag', 'website' ),
			'add_new_item'               => __( 'Ajouter un tag', 'website' ),
			'new_item_name'              => __( 'Nouveau tag', 'website' ),
			'separate_items_with_commas' => __( 'Séparer les tags par une virgule', 'website' ),
			'add_or_remove_items'        => __( 'Ajouter ou supprimer un tag', 'website' ),
			'choose_from_most_used'      => __( 'Choisir parmi les tags les plus visités', 'website' ),
			'not_found'                  => __( 'Aucun tag trouvé', 'website' ),
			'menu_name'                  => __( 'Tags', 'website' ),
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
