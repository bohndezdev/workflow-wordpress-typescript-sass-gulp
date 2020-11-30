<?php
function the_template_menus() {
  register_nav_menus( array(
    'main-menu' => __('Main Menu', 'Vamospormas'),
    'material-menu' => __('Material Menu', 'Vamospormas'),
  ));
}
add_action('init', 'the_template_menus');
