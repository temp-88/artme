jQuery(document).ready(function() {

// Fancybox
jQuery(".fancybox").fancybox();

// Кнопка меню на мобильной версии сайта
jQuery(".btn-slide").click(function(){
   jQuery("#slide-menu").slideToggle("fast");
   jQuery(".wrapper, .btn-slide").toggleClass("active"); return false;
});

});