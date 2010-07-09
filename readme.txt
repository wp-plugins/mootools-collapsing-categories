=== Moo Collapsing Categories ===
Contributors: 3dolab
Homepage: http://www.3dolab.net/blog
Tags: categories, sidebar, widget, navigation, menu, posts, collapsing, collapsible, mootools
Requires at least: 2.8
Tested up to: 2.9.2
Stable tag: 0.2

This plugin uses Javascript based on MooTools framework to dynamically expand or collaps the set of
categories listing. Fork of Rob Felty's Collapsing Categories

== Description ==

This is a relatively simple plugin that uses Javascript based on MooTools framework to
make the Archive links in the sidebar collapsable by year and/or month.


= What's new? =

* 0.2 (2010.06.28)
    * Relies on MooTools 1.2.4

* 0.1 (2010.06.16)
    * Initial release
    * Based on Rob Felty's Collapsing Categories v.1.1.1
    * Relies on MooTools 1.1.1
 
See the CHANGELOG for more information


This is a very simple plugin that uses Javascript to form a collapsable set of
links in the sidebar for the categories. Every post corresponding to a given
category will be expanded.


= CSS Class changes = 
Version 1.1 introduces different css classes to the collapsing categories and
posts, which should make it easier to style in the future, and more consistent
across my other collapsing plugins
Please see below for an explanation of the css classes

= IMPORTANT INFORMATION regarding wordpress 2.7 and 2.8 =

Version 0.2 is compatible with wordpress 2.8+,
but not compatible with prior versions. If you are using wordpress 2.7.1 or
earlier, please use collapsing categories version 0.9.9.

If you prefer to insert code into your theme manually instead of using
widgets, please note that the manual installation instructions have changed. 

= What's New?=

* 0.2 (2010.06.28)
    * Relies on MooTools 1.2.4

* 0.1 (2010.06.16)
    * Initial release
    * Based on Rob Felty's Collapsing Categories v.1.0.2
    * Relies on MooTools 1.1.1

== Installation ==

IMPORTANT!
Please deactivate before upgrading, then re-activate the plugin. 

Unpackage contents to wp-content/plugins/ so that the files are in a
collapsing-categories directory.

= Widget installation = 

 Activate the plugin, then simply go the
Presentation > Widgets section and drag over the Collapsing Categories Widget.


= Manual installation = 

 Activate the plugin, then insert the following into your template: (probably
in sidebar.php). See the Options section for more information on specifying
options.
`
<?php 
echo "<ul class='collapsCatList'>\n";
if (function_exists('collapsCat')) {
  collapsCat();
} else {
  wp_get_categories('your_options_here');
}
echo "</ul>\n";
?>
`

== Frequently Asked Questions ==


=  What is the option about the ID of the sidebar? =

Here is the deal. If you have a rule in your theme like:
`#sidebar ul li ul li {color:blue}`
it will override a rule like
`li.collapsArch {color:red}`
because it uses an ID, instead of a class. That is the way CSS works. So if
you change our rule to:
`#sidebar li.collapsArch {color:red}`
then this alleviates that problem. 
The option for the ID of the sidebar does this automatically for you.

= How do I use different symbols for collapsing and expanding? =

If you want to use images, you can upload your own images to
http://yourblogaddress/wp-content/plugins/collapsing-categories/img/collapse.gif
and expand.gif

There is an option for this.

= I have selected a category to expand by default, but it doesn't seem to work =

If you select a sub-category to expand by default, but not the parent
category, you will not see the sub-category expanded until you expand the
parent category.  You probably want to add both the parent and the
sub-category into the expand by default list.

= I can't get including or excluding to work = 

Make sure you specify category names, not ids.

= There seems to be a newline between the collapsing/expanding symbol and the
category name. How do I fix this? =

If your theme has some css that says something like

#sidebar li a {display:block}

that is the problem. 
You probably want to add a float:left to the .sym class

= No categories are showing up! What's wrong?" =

Are you using categories or tags? By default, collapsing categories only lists
categories. Please check the options in the settings page (or in the widget if
you are using the widget)

=  How do I change the style of the collapsing categories lists? =

As of version 0.9, there are several default styles that come with
collapsing-categories. You can choose from these in the settings panel, or you
can create your own custom style. A good strategy is to choose a default, then
modify it slightly to your needs. 

The following classes are used:
* collapsing - applied to all ul and li elements
* categories - applied to all ul and li elements
* list - applied to the top-level ul
* item - applied to each li which has no sub-elements
* expand - applied to a category which can be expanded (is currently
  collapsed)
* collapse - applied to a category which can be collapsed (is currently
  expanded)
* sym - class for the expanding / collapsing symbol

An example:

<ul id='widget-collapscat-15-top ' class='collapsing categories list'>
  <li class='collapsing categories post'><a
    href='http://mysite.com/your-website/about-your-own-site/'
    title='About your own site'>About your own site</a>
  </li>
  <li class='collapsing categories'><span class='collapsing categories expand'
    onclick='expandCollapse(event, "▶","▼", 1, "collapsing categories"); return
    false'><span class='sym'>▶</span>Web hosting</span>
    <ul id='collapsCat-176-15' style="display:none">
      <li class='collapsing categories post'><a 
        href='http://mysite.com/your-website/web-hosting/about-webhosting/'
        title='About webhosting'>About webhosting</a>
      </li>
      <li class='collapsing categories post'><a 
        href='http://mysite.com/products/webhosting-1/'
        title='Webhosting #1'>Webhosting #1</a>
      </li>
      <li class='collapsing categories post'><a 
        href='http://mysite.com/products/webhosting-2/'
        title='Webhosting #2'>Webhosting #2</a>
      </li>
    </ul>
  </li> <!-- ending subcategory -->

== Screenshots ==

1. a few expanded categories with default theme, showing nested categories
2. available options 

== Options ==
Style options can be set via the settings panel. All other options can be set
from the widget panel. If you wish to insert the code into your theme manually
instead of using a widget, you can use the following options. These options
can be given to the `collapsCat()` function either as an array or in query
style, in the same manner as the `wp_list_categories` function.

`$defaults=array(
   'showPostCount' => true,
   'inExclude' => 'exclude',
   'inExcludeCats' => '',
   'showPosts' => true, 
   'showPages' => false,
   'linkToCat' => true,
   'olderThan' => 0,
   'excludeAll' => '0',
   'catSortOrder' => 'ASC',
   'catSort' => 'catName',
   'postSortOrder' => 'ASC',
   'postSort' => 'postTitle',
   'expand' => '0',
   'defaultExpand' => '',
   'postTitleLength' => 0,
   'animate' => 0,
   'catfeed' => 'none',
   'catTag' => 'cat',
   'showPostDate' => false,
   'postDateAppend' => 'after',
   'postDateFormat' => 'm/d',
   'useCookies' => true,
   'showTopLevel' => true,
   'postsBeforeCats' => false,
   'debug'=>'0'
);
`

* inExclude
    * Whether to include or exclude certain categories 
        * 'exclude' (default) 
        * 'include'
* inExcludeCats
    * The categories which should be included or excluded
* showPages
    * Whether or not to include pages as well as posts. Default if false
* linkToCat
    * 1 (true), clicking on a category title will link to the category archive (default)
    * 0 (false), clicking on a category title expands and collapses 
* catSort
    * How to sort the categorys. Possible values:
        * 'catName' the title of the category (default)
        * 'catId' the Id of the category
        * 'catSlug' the url of the category
        * 'catCount' the number of posts in the category
        * 'catOrder' custom order specified in the categorys settings
* catSortOrder
    * Whether categories should be sorted in normal or reverse
      order. Possible values:
        * 'ASC' normal order (a-z 0-9) (default)
        * 'DESC' reverse order (z-a 9-0)  
* postSort
    * How to sort the posts. Possible values:
        * 'postDate' the date of the post (default)
        * 'postId' the Id of the post
        * 'postTitle' the title of the post
        * 'postComment' the number of comments on the post
* postSortOrder
    * Whether post should be sorted in normal or reverse
      order. Possible values:
        * 'ASC' normal order (a-z 0-9) (default)
        * 'DESC' reverse order (z-a 9-0)  
* expand
    * The symbols to be used to mark expanding and collapsing. Possible values:
        * '0' Triangles (default)
        * '1' + -
        * '2' [+] [-]
        * '3' images (you can upload your own if you wish)
        * '4' custom symbols
* customExpand
    * If you have selected '4' for the expand option, this character will be
      used to mark expandable link categories
* customCollapse
    * If you have selected '4' for the expand option, this character will be
      used to mark collapsible link categories
* postTitleLength
    * Truncate post titles to this number of characters (default: 0 = don't
      truncate)
* animate
    * When set to true, collapsing and expanding will be animated
* catfeed
    * Whether to add a link to the rss feed for a category. Possible values:
        * 'none' (default)
        * 'text' shows RSS
        * 'image' shows an RSS icon
* catTag
    * Whether to include categories, tags, or both. Possible values:
        * 'cat' (default)
        * 'tag'
        * 'both'
*   showPostDate 
    * When true, show the date of each post
*   postDateAppend
    * Show the date before or after the post title. Possible values:
        * 'after' (default)
        * 'before'
*   postDateFormat
    * What format the post date is in. This uses the standard php date
      formatting codes
*   useCookies
    * When true, expanding and collapsing of categories is remembered for each
      visitor. When false, categories are always display collapsed (unless
      explicitly set to auto-expand). Possible values:
         * 1 (true) (default)
         * 0 (false)
* debug
    * When set to true, extra debugging information will be displayed in the
      underlying code of your page (but not visible from the browser). Use
      this option if you are having problems
* showTopLevel
    * When set to false, the top level category will not be shown. This could
      be useful if you only want to show subcategories from one particular
      top-level category
         * 1 (true) (default)
         * 0 (false)
* postsBeforeCats
    * When set to true, posts in category X will be ordered before
      subcategories of category X
         * 1 (true)
         * 0 (false) (default)


= Examples =

`collapsCat('animate=1&catSort=ASC&expand=3&inExcludeCats=general,uncategorized')`
This will produce a list with:
* animation on
* categories shown in alphabetical order
* using images to mark collapsing and expanding
* exclude posts from  the categories general and uncategorized


== Demo ==

I use this plugin in my blog at http://blog.robfelty.com


== CAVEAT ==

Currently this plugin relies on Javascript to expand and collapse the links.
If a user's browser doesn't support javascript they won't see the links to the
posts, but the links to the categories will still work (which is the default
behavior in wordpress anyways)

== CHANGELOG ==

* 0.2 (2010.06.28)
    * Relies on MooTools 1.2.4

* 0.1 (2010.06.16)
    * Initial release
    * Based on Rob Felty's Collapsing Categories v.1.1.1
    * Relies on MooTools 1.1.1
