jQuery(document).ready(function() {

	// Fancybox
	jQuery(".fancybox").fancybox({
		helpers : {
			overlay : {
				locked : false
			}
		}
	});
	
	/* footer position */
	$(window).on('resize', setFooter);
	setFooter();
	
	/* mobile menu */
	$('.jquerymenu').mobileMenu();
	
	/* items height */
	$('.scheme-unit .inner-desc').setItemsHeight({
		media: 950,
		parent: '.description'
	});

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
	$.fn.setItemsHeight =  function(options) {
		_this = this;
		_this.items = $(this);
		_this.media = options.media || false;
		_this.height = 0;
		_this.parent = options.parent || false;
		_this._inited = false;
		
		_this.methods = {
			checkWidth: function() {
				if (_this.media) {
					if (_this.media > 0) {
						if ($(window).width() >= _this.media) {
							_this.methods.setHeight();
						}
						else {
							_this.methods.destroy();
						}
					}
					else if (_this.media < 0) {
						if ($(window).width() <= _this.media) {
							_this.methods.setHeight();
						}
						else {
							_this.methods.destroy();
						}
					}
					else {
						return false;
					}
				}
				else {
					_this.methods.destroy();
				}
			},
			init: function() {
				_this.methods.checkWidth();
				$(window).on('resize', _this.methods.checkWidth);
			},
			destroy: function() {
				if (_this.parent) {
					_this.items.closest(_this.parent).css('min-height', '');
				}
				else {
					_this.items.css('min-height', '');
				}
			},
			setHeight: function() {
				var maxH = 0;
				_this.items.each(function(){
					var h = $(this).outerHeight();
					if (h > maxH) {
						maxH = h;
					}
				});
				if (_this.parent) {
					_this.items.closest(_this.parent).css('min-height', maxH);
				}
				else {
					_this.items.css('min-height', maxH);
				}
			}
		}
		_this.methods.init();
	};
	
	$.fn.mobileMenu = function(options) {
		_this = this;
		_this.button = $(this);
		_this.menu = $('#slide-menu');
		_this.buttonPos = 55;
		_this.media = 600;
		_this._inited = false;
		_this._touch = ('ontouchstart' in document.documentElement);
		_this._animation = (document.body.style.animation == undefined && document.body.style.webkitAnimation == undefined) ? false : true;
		
		_this.methods = {
			checkWidth: function() {
				if ($(window).width() > 600) {
					if (_this._inited) {
						_this.methods.destroy();
					}
					return;
				}
				else {
					_this.methods.init();
				}
			},
			init: function() {
				_this._inited = true;
				_this.button.off('click.mobileMenuButton');
				_this.methods.setButPosition();
				
				if (_this._animation) {
					_this.menu.addClass('animated');
				}
				
				if (_this._touch) {
					$(window).on('touchmove.mobileMenuButton', this.setButPosition);
				}
				else {
					$(window).on('scroll.mobileMenuButton', this.setButPosition);
				}
				
				if (!$('#menu-overlay').length) {
					_this.overlay = $('<div id="menu-overlay" />');
					
					$('body').append(_this.overlay);
					$(_this.overlay).on('click touchstart', function() {
						_this.methods.hideMenu();
					});
				}
				
				_this.button.on('click.mobileMenuButton', function(e){
					e.preventDefault();
					
					if (!_this.menu.hasClass('active')) {
						_this.methods.showMenu();
					}
					else {
						_this.methods.hideMenu();
					}
				});
				
			},
			destroy: function() {
				if (_this._touch) {
					$(window).off('touchmove.mobileMenuButton');
				}
				else {
					$(window).off('scroll.mobileMenuButton');
				}
				_this.overlay.hide();
				_this._inited = false;
			},
			setButPosition: function(e) {
				if ($(window).scrollTop() > _this.buttonPos) {
					_this.button.addClass('floating');
				}
				else {
					_this.button.removeClass('floating');
				}
			},
			showMenu: function(e) {
				_this.button.addClass('active');
				_this.menu.addClass('active');
				$('body').addClass('body-hidden');
				_this.overlay.fadeIn();
				
				_this.menu.css('width', $(document).width() - _this.button.outerWidth());
				
				if (_this._animation) {
					_this.menu.show();
						_this.menu
							.addClass('bounceInLeft')
							.removeClass('bounceOutLeft');
				}
				else {
					_this.menu.slideDown('fast');
				}
			},
			hideMenu: function(e) {
				if (_this._animation) {
					_this.menu
						.addClass('bounceOutLeft')
						.removeClass('bounceInLeft');
				}
				else {
					_this.menu.slideUp('fast');
				}
				
				_this.button.removeClass('active');
				_this.menu.removeClass('active');
				$('body').removeClass('body-hidden');
				_this.overlay.fadeOut();
			}
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