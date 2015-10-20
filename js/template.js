jQuery(document).ready(function() {

	// Fancybox
	jQuery(".fancybox").fancybox({
		helpers : {
			overlay : {
				locked : false
			}
		}
	});

	// Кнопка меню на мобильной версии сайта
	/*jQuery(".btn-slide").click(function() {
		setMenuPos()
		jQuery("#slide-menu").slideToggle("fast").toggleClass('active');
			
		jQuery(".wrapper, .btn-slide").toggleClass("active");
		return false;
	});*/
	
	/* footer position */
	$(window).on('resize', setFooter)
	setFooter();
	
	/* mobile menu */
	$('.jquerymenu').mobileMenu();

});

function setFooter() {
	var $footer = $('.footer');
	if ($footer.length) {
		var footerH = $footer.outerHeight();
		$('.main > .wrapper').css('padding-bottom', footerH + 30);
		$footer.css('margin-top', -footerH);
	}
}

(function( $ ) {
	$.fn.mobileMenu = function(options) {
		_this = this;
		_this.body = $('.main');
		_this.button = $(this);
		_this.menu = $('#slide-menu');
		_this.buttonPos = 55;
		_this.media = 600;
		_this.error = 0;
		
		_this.methods = {
			checkWidth: function() {
				if ($(window).width() > 600) {
					$(window).off('scroll.mobileMenuButton');
					return;
				}
				_this.methods.init();
			},
			init: function() {
				_this.button.off('click.mobileMenuButton');
				_this.methods.setButPosition();
				$(window).on('scroll.mobileMenuButton', this.setButPosition);
				
				_this.button.on('click.mobileMenuButton', function(e){
					e.preventDefault();
					if($(this).hasClass('active')) {
						_this.methods.destroy();
					}
					else {
						_this.methods.setMenuPosition();
						_this.button.addClass('active');
						_this.menu.addClass('active');
						$(window).on('scroll.mobileMenu', _this.methods.setMenuPosition);
					}
					
					_this.menu.slideToggle('fast');
				});
			},
			destroy: function() {
				$(window).off('scroll.mobileMenu');
				_this.lastScrollPos = undefined;
				_this.error = 0;
				_this.menu.removeClass('sticky-bottom active sticky-top');
				_this.button.removeClass('active');
				
			},
			setButPosition: function() {
				if ($(window).scrollTop() > _this.buttonPos) {
					_this.button.addClass('floating');
				}
				else {
					_this.button.removeClass('floating');
				}
			},
			setMenuPosition: function() {
				var wH = $(window).height(),
					bodyH = _this.body.innerHeight(),
					menuH = _this.menu.innerHeight(),
					scrollTop = $(window).scrollTop(),
					menuTop = _this.menu.offset().top;
					
				if (menuH < wH) {
					_this.menu.addClass('sticky-top').removeClass('sticky-bottom');
				}
				else {
					if (_this.lastScrollPos == undefined) {
						
						if (scrollTop < _this.buttonPos) {
							_this.menu.css('top', 0);
						}
						else if ((bodyH - scrollTop) >= menuH) {
							_this.error = _this.buttonPos;
							_this.menu.css({
								'top': scrollTop - _this.error
							});
						}
						else {
							_this.error = _this.buttonPos;
							_this.menu.css({
								'top': bodyH - menuH - _this.error
							});
						}
					}
					else {
						if (_this.lastScrollPos > scrollTop && scrollTop < menuTop) {
							_this.menu
								.addClass('sticky-top')
								.removeClass('sticky-bottom');
						}
						else if (_this.lastScrollPos < scrollTop && _this.menu.hasClass('sticky-top')) {
							_this.menu
								.css('top', menuTop)
								.removeClass('sticky-top');
						}
						else if (_this.lastScrollPos > scrollTop && _this.menu.hasClass('sticky-bottom')) {
							_this.menu
								.css('top', menuTop)
								.removeClass('sticky-bottom');
						}
						else if (bodyH < scrollTop + menuH || scrollTop + wH > menuH + menuTop) {
							_this.menu
								.addClass('sticky-bottom')
								.removeClass('sticky-top');
						}
						else {
							//console.log('else')
						}
					}
				}
				_this.lastScrollPos = scrollTop;
			},
		}
		
		if (_this.media) {
			_this.methods.checkWidth();
			$(window).on('resize', _this.methods.checkWidth);
		}
		else {
			_this.methods.init();
		}
	};
})(jQuery);