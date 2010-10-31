<?php
$style=".widget_collapscat span.collapsing.categories.item {
        border:0;
        padding:0; 
        margin:0; 
        cursor:pointer;
}
.widget_collapscat li.collapsing.categories.item a.self {font-weight:bold}
.widget_collapscat ul.collapsing.categories.list ul.collapsing.categories.list:before {content:'';} 
.widget_collapscat ul.collapsing.categories.list li.collapsing.categories.item:before {content:'';} 
.widget_collapscat ul.collapsing.categories.list li.collapsing.categories.item {list-style-type:none}
.widget_collapscat ul.collapsing.categories.list li.collapsing.categories.item {
       text-indent:-1em;
       padding-left:1em;
       margin:0 0 0 1em;}
.widget_collapscat ul.collapsing.categories.list li.collapsing.categories.item:before {content: '\\\\00BB \\\\00A0' !important;} 
.widget_collapscat ul.collapsing.categories.list .sym {
   font-size:1.2em;
   font-family:Monaco, 'Andale Mono', 'FreeMono', 'Courier new', 'Courier', monospace;
    cursor:pointer;
    padding-right:5px;}";

$default=$style;

$block=".widget_collapscat li.collapsing.categories.item a {
            display:inline-block;
            text-decoration:none;
            margin:0;
            padding:0;
            }
.widget_collapscat li.collapsing.categories.item ul li.collapsing.categories.item a {
            display:block;
}
.widget_collapscat li.collapsing.categories.item a:hover {
            background:#CCC;
            text-decoration:none;
          }
.widget_collapscat span.collapsing.categories.item {
        border:0;
        padding:0; 
        margin:0; 
        cursor:pointer;
}
.widget_collapscat li.collapsing.categories.item a.self {font-weight:bold}
.widget_collapscat ul.collapsing.categories.list ul.collapsing.categories.list:before {content:'';} 
.widget_collapscat ul.collapsing.categories.list li.collapsing.categories.item:before {content:'';} 
.widget_collapscat ul.collapsing.categories.list li.collapsing.categories.item {list-style-type:none}
.widget_collapscat ul.collapsing.categories.list li.collapsing.categories.item {
      }
.widget_collapscat ul.collapsing.categories.list .sym {
   font-size:1.2em;
   font-family:Monaco, 'Andale Mono', 'FreeMono', 'Courier new', 'Courier', monospace;
    float:left;
    cursor:pointer;
    padding-right:5px;
}
";

$noArrows=".widget_collapscat span.collapsing.categories.item {
        border:0;
        padding:0; 
        margin:0; 
        cursor:pointer;
}
.widget_collapscat li.collapsing.categories.item a.self {font-weight:bold}
.widget_collapscat ul.collapsing.categories.list ul.collapsing.categories.list:before {content:'';} 
.widget_collapscat ul.collapsing.categories.list li.collapsing.categories.item:before {content:'';} 
.widget_collapscat ul.collapsing.categories.list li.collapsing.categories.item {list-style-type:none}
.widget_collapscat ul.collapsing.categories.list .sym {
   font-size:1.2em;
   font-family:Monaco, 'Andale Mono', 'FreeMono', 'Courier new', 'Courier', monospace;
    cursor:pointer;
    padding-right:5px;}";
$selected='default';
$custom=get_option('collapsCatStyle');
?>