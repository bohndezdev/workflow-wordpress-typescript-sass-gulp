<?php

function the_template_styles() {
  wp_register_style(
    'styles',
    get_template_directory_uri() . '/assets/css/styles.min.css',
    array(),
    '0.0.1'
  );
  wp_enqueue_style('styles');

  wp_enqueue_script(
    'bundle',
    get_template_directory_uri() . '/assets/js/bundle.min.js',
    array(),
    '0.0.1',
    true
  );
  wp_enqueue_script('bundle');
}
add_action('wp_enqueue_scripts', 'the_template_styles');


function the_template_admin_scripts() {
  wp_enqueue_script(
    'adminjs',
    get_template_directory_uri() . '/assets/js/admin.js',
    array('jquery'),
    '1.0.0',
    true
  );

  // admin-ajax.php for admin.js file.
  wp_localize_script(
    'adminjs',
    'adminUrl',
    array('ajaxurl' => admin_url( 'admin-ajax.php' ))
  );
}
add_action('admin_enqueue_scripts', 'the_template_admin_scripts');
