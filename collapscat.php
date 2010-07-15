<?php
/*
Plugin Name: Moo Collapsing Categories
Plugin URI: http://www.3dolab.net/en/259/mootools-collapsing-categories-and-archives
Description: Allows users to expand and collapse categories with MooTools. NOT COMPATIBLE WITH WP 2.7 OR LESS  <a href='options-general.php?page=collapsArch.php'>Options and Settings</a> 
Author: 3dolab
Version: 0.1
Author URI: http://www.3dolab.net

Copyright 2010 3dolab

This work is largely based on the Collapsing Categories plugin by Robert Felty
(http://robfelty.com), which was also distributed under the GPLv2.
His website has lots of informations.

This file is part of Moo Collapsing Categories

    Moo Collapsing Categories is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    Moo Collapsing Archives is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Collapsing Categories; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/ 

$url = get_settings('siteurl');
global $collapsCatVersion;
$collapsCatVersion = '0.1';

if (!is_admin()) {
  add_action('wp_head', wp_enqueue_script('mootools',"$url/wp-content/plugins/mootools-collapsing-archives/mootools.js"));
  add_action('wp_head', wp_enqueue_script('collapsFunctions',
  "$url/wp-content/plugins/mootools-collapsing-categories/collapsFunctions.js", '', '1.6'));
  add_action( 'wp_head', array('collapscat','get_head'));
//  add_action( 'wp_footer', array('collapsCat','get_foot'));
} else {
  // call upgrade function if current version is lower than actual version
  $dbversion = get_option('collapsCatVersion');
  if (!$dbversion || $collapsCatVersion != $dbversion)
    collapscat::init();
}
add_action('admin_menu', array('collapscat','setup'));
add_action('init', array('collapscat','init_textdomain'));
register_activation_hook(__FILE__, array('collapscat','init'));

class collapscat {
	function init_textdomain() {
	  $plugin_dir = basename(dirname(__FILE__)) . '/languages/';
	  load_plugin_textdomain( 'mootools-collapsing-categories', WP_PLUGIN_DIR . $plugin_dir, $plugin_dir );
	}

	function init() {
    global $collapsCatVersion;
	  include('collapsCatStyles.php');
		$defaultStyles=compact('selected','default','block','noArrows','custom');
    $dbversion = get_option('collapsCatVersion');
    if ($collapsCatVersion != $dbversion && $selected!='custom') {
      $style = $defaultStyles[$selected];
      update_option( 'collapsCatStyle', $style);
      update_option( 'collapsCatVersion', $collapsCatVersion);
    }
    if( function_exists('add_option') ) {
      update_option( 'collapsCatOrigStyle', $style);
      update_option( 'collapsCatDefaultStyles', $defaultStyles);
    }
    if (!get_option('collapsCatOptions')) {
      include('defaults.php');
      update_option('collapsCatOptions', $defaults);
    }
    if (!get_option('collapsCatStyle')) {
      add_option( 'collapsCatStyle', $style);
		}
    if (!get_option('collapsCatSidebarId')) {
      add_option( 'collapsCatSidebarId', 'sidebar');
		}
    if (!get_option('collapsCatVersion')) {
      add_option( 'collapsCatVersion', $collapsCatVersion);
		}

	}

	function setup() {
		if( function_exists('add_options_page') ) {
      if (current_user_can('manage_options')) {
				add_options_page(__('Collapsing Categories'),
            __('Collapsing Categories'),1,
            basename(__FILE__),array('collapscat','ui'));
			}
		}
	}
	function ui() {
		include_once( 'collapscatUI.php' );
	}

	function get_head() {
    $style=stripslashes(get_option('collapsCatStyle'));
    echo "<style type='text/css'>
    $style
    </style>\n";
	}
  function get_foot() {
    $url = get_settings('siteurl');
		echo "<script type=\"text/javascript\">\n";
		echo "// <![CDATA[\n";
		echo '/* These variables are part of the Collapsing Categories Plugin 
		      *  Version: 1.1.1
		      *  $Id: collapscat.php 199109 2010-01-28 20:30:07Z robfelty $
					* Copyright 2007 Robert Felty (robfelty.com)
					*/' . "\n";
    global $expandSym,$collapseSym,$expandSymJS, $collapseSymJS, 
      $wpdb,$options,$wp_query, $autoExpand, $postsToExclude, 
      $postsInCat;
  include('defaults.php');
  $options=wp_parse_args($args, $defaults);
  extract($options);
  if ($expand==1) {
    $expandSym='+';
    $collapseSym='—';
  } elseif ($expand==2) {
    $expandSym='[+]';
    $collapseSym='[—]';
  } elseif ($expand==3) {
    $expandSym="<img src='". get_settings('siteurl') .
         "/wp-content/plugins/mootools-collapsing-categories/" . 
         "img/expand.gif' alt='expand' />";
    $collapseSym="<img src='". get_settings('siteurl') .
         "/wp-content/plugins/mootools-collapsing-categories/" . 
         "img/collapse.gif' alt='collapse' />";
  } elseif ($expand==4) {
    $expandSym=$customExpand;
    $collapseSym=$customCollapse;
  } else {
    $expandSym='▶';
    $collapseSym='▼';
  }
  if ($expand==3) {
    $expandSymJS='expandImg';
    $collapseSymJS='collapseImg';
  } else {
    $expandSymJS=$expandSym;
    $collapseSymJS=$collapseSym;
  }
    echo "var expandSym=\"$expandSym\";";
    echo "var collapseSym=\"$collapseSym\";";
    echo "var expand=\"$expandSymJS\";";
    echo "var collapse=\"$collapseSymJS\";";
    echo "var animate=\"$animate\";";
    foreach ($autoExpand as $expandedCat){
	    $expandCookieCat = "Cookie.set('collapsCat-".$expandedCat."', 'inline');";
	    echo $expandCookieCat;
    }
		echo "// ]]>\n</script>\n";
  }
}


include_once( 'collapscatlist.php' );
function collapsCat($args='', $print=true) {
  if (!is_admin()) {
    list($posts, $categories, $parents, $options) = 
        get_collapscat_fromdb($args);
    list($collapsCatText, $postsInCat) = list_categories($posts, $categories,
        $parents, $options);
    $url = get_settings('siteurl');
    if ($print) {
      print($collapsCatText);
      echo "<li style='display:none'><script type=\"text/javascript\">\n";
      echo "// <![CDATA[\n";
      echo '/* These variables are part of the Collapsing Categories Plugin 
      *  Version: 1.1.1
      *  $Id: collapscat.php 199109 2010-01-28 20:30:07Z robfelty $
      * Copyright 2007 Robert Felty (robfelty.com)
      */' . "\n";
      global $expandSym,$collapseSym,$expandSymJS, $collapseSymJS, 
      $wpdb,$options,$wp_query, $autoExpand, $postsToExclude, 
      $postsInCat;
  include('defaults.php');
  $options=wp_parse_args($args, $defaults);
  extract($options);
  if ($expand==1) {
    $expandSym='+';
    $collapseSym='—';
  } elseif ($expand==2) {
    $expandSym='[+]';
    $collapseSym='[—]';
  } elseif ($expand==3) {
    $expandSym="<img src='". get_settings('siteurl') .
         "/wp-content/plugins/mootools-collapsing-categories/" . 
         "img/expand.gif' alt='expand' />";
    $collapseSym="<img src='". get_settings('siteurl') .
         "/wp-content/plugins/mootools-collapsing-categories/" . 
         "img/collapse.gif' alt='collapse' />";
  } elseif ($expand==4) {
    $expandSym=$customExpand;
    $collapseSym=$customCollapse;
  } else {
    $expandSym='▶';
    $collapseSym='▼';
  }
  if ($expand==3) {
    $expandSymJS='expandImg';
    $collapseSymJS='collapseImg';
  } else {
    $expandSymJS=$expandSym;
    $collapseSymJS=$collapseSym;
  }
       echo "var expandSym=\"$expandSym\";";
    echo "var collapseSym=\"$collapseSym\";";
    echo "var expand=\"$expandSymJS\";";
    echo "var collapse=\"$collapseSymJS\";";
    echo "var animate=\"$animate\";";
    foreach ($autoExpand as $expandedCat){
	    $expandCookieCat = "Cookie.set('collapsCat-".$expandedCat."', 'inline');";
	    echo $expandCookieCat;
    }
      echo "// ]]>\n</script></li>\n";
    } else {
      return(array($collapsCatText, $postsInCat));
    }
  }
}
$version = get_bloginfo('version');
if (preg_match('/^2\.[8-9]/', $version)) 
  include('collapscatwidget.php');
?>
