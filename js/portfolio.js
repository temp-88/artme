jQuery(document).ready(function(){
	
var $container = $('#container');
// init
$container.packery({
  itemSelector: '.item',
  gutter: 10
});

// Flip
$(".portfolio-page .item").flip({
  axis: 'y',
  trigger: 'hover'
});

});