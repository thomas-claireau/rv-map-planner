<?php

define( 'WP_CONTENT_DIR', ABSPATH . 'assets-rvmapplanner' );
define( 'WP_CONTENT_URL', 'https://' . $_SERVER['HTTP_HOST'] . '/assets-rvmapplanner' ); // Do not remove. Removing this line could break your site. Added by Security > Settings > Change Content Directory.

define( 'FRONTEND_URL', 'http://localhost:3000' );

define( 'BACKEND_USERNAME', 'USERNAME' );
define( 'BACKEND_PASSWORD', 'PASSWORD' );

/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en « wp-config.php » et remplir les
 * valeurs.
 *
 * Ce fichier contient les réglages de configuration suivants :
 *
 * Réglages MySQL
 * Préfixe de table
 * Clés secrètes
 * Langue utilisée
 * ABSPATH
 *
 * @link https://fr.wordpress.org/support/article/editing-wp-config-php/.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define( 'DB_NAME', 'template-wordpress-next' );

/** Utilisateur de la base de données MySQL. */
define( 'DB_USER', 'USER' );

/** Mot de passe de la base de données MySQL. */
define( 'DB_PASSWORD', 'PASSWORD' );

/** Adresse de l’hébergement MySQL. */
define( 'DB_HOST', 'localhost' );

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/**
 * Type de collation de la base de données.
 * N’y touchez que si vous savez ce que vous faites.
 */
define( 'DB_COLLATE', '' );

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clés secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY', 'V?SF!8cN^$?RcYpQ=ozI2@ay4/0y-?NX9A4!]je/(rT$[W~yUjf@?p-q6;J1gU*y' );
define( 'SECURE_AUTH_KEY', 'SA?@8[4I,?9W1fl f3,8rYgM.(.|sAXGD-[1uNKTBr7Tp+FW%*ZzzwTjhLxdaWGc' );
define( 'LOGGED_IN_KEY', '-:U*N @y](5Lnkq=0fOaBN:I^nalyHA<LC(^8Kj(pXx#5rW)F}^Y`kLc5ITO,ogR' );
define( 'NONCE_KEY', 'IY!9%oJ-Juh(qJK$DU300a#.N2g&.Q)e=A{@zQw7@1s0,qD-I/:D;[}.tUH$V7h5' );
define( 'AUTH_SALT', '^+L}B8CEy-;f/]U(ei<#3N2p^a=1L:}!;e`Nz_m$8=;f*w%upwb=Mwx8m])TZomi' );
define( 'SECURE_AUTH_SALT', '552?:*)F@fd<O|V2/&U6%bsaRp>cW!pVbUT+Y_d5uc+Y[@NJ~owcEXAGh^FKSMKm' );
define( 'LOGGED_IN_SALT', 'm]2z85:eyo,UBSpc0=mrU}YPi8e^Mg%v1*y]:V(d0^CIi+xuGYax4A`?i5`H%eGh' );
define( 'NONCE_SALT', 'l%Fq@ sdE^>jRLx-%#/8X/kGvxg2XYU (si]P/~N@]|*{i!o^~?;.g]04|aeZ`6&' );
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix = 'tcd3v_';

/**
 * Pour les développeurs : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortement recommandé que les développeurs d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d’information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur le Codex.
 *
 * @link https://fr.wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_DISPLAY', true );
define( 'WP_DEBUG_LOG', true );

// Block all WordPress auto updates
define( 'AUTOMATIC_UPDATER_DISABLED', true );
// Disable posts revisions
define( 'WP_POST_REVISIONS', 0 );
// Force uploads to be filtered
define( 'ALLOW_UNFILTERED_UPLOADS', false );

/* C’est tout, ne touchez pas à ce qui suit ! Bonne publication. */

/** Chemin absolu vers le dossier de WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once ABSPATH . 'wp-settings.php';
