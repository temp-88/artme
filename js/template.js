jQuery(document).ready(function() {

	// Fancybox
	jQuery(".fancybox").fancybox({
		helpers : {
			overlay : {
				locked : false
			}
		}
	});

	/* Footer Position */
	$(window).on('resize', setFooter);
	setFooter();

	/* Mobile Menu */
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
	$.fn.setItemsHeight =  function(options) {
		this.items = $(this);
		this.height = 0;
		this._inited = false;

		if (typeof options == 'object') {
			this.options = options;
			this.data('options', options);
		}
		else if(this.data('options')) {
			this.options =  this.data('options');
		}

		this.checkWidth = function() {
			if (this.options.media) {
				var winW = window.innerWidth || $(window).width();
				if (this.options.media > 0 && winW >= this.options.media || this.options.media < 0 && winW <= this.options.media) {
					this.setHeight();
				}
				else {
					this.destroy();
				}
			}
			else {
				this.setHeight();
			}
		};
		this.init = function() {
			this.checkWidth();

			$(window).resize($.proxy(this.checkWidth, this));
		};
		this.destroy = function() {
			if (this.options.parent) {
				this.items.closest(this.options.parent).css('min-height', '');
			}
			else {
				this.items.css('min-height', '');
			}
		};
		this.setHeight = function() {
			var maxH = 0;
			this.items.each(function(){
				var h = $(this).outerHeight();
				if (h > maxH) {
					maxH = h;
				}
			});
			if (this.options.parent) {
				this.items.closest(this.options.parent).css('min-height', maxH);
			}
			else {
				this.items.css('min-height', maxH);
			}
		};

		if (options == 'update') {
			this.checkWidth();
		}
		else {
			this.init();
		}
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
		};

		if (_this.media) {
			_this.methods.checkWidth();
			$(window).on('resize', _this.methods.checkWidth);
		}
		else {
			_this.methods.init();
		}
	};
})(jQuery);