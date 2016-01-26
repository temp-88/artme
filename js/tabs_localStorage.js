jQuery(document).ready(function() {
	
	var serviceAnchors = new Array(
		'design',
		'engineering',
		'supervision',
		'repair'
	);
	
	$('ul.tabs__caption').each(function(i) {
		var index = 0,
			hash = window.location.hash.replace('#','');
		if (hash.length) {
			index = $.inArray(window.location.hash.replace('#',''), serviceAnchors);
		}
		else if (localStorage.getItem('tab' + i)) {
			index = i;
		}
		if (index == -1) {
			index = 0;
		}
		
		$(this).find('li')
			.removeClass('active')
			.eq(index)
			.addClass('active')
			.closest('div.tabs')
			.find('div.tabs__content')
			.removeClass('active')
			.eq(index)
			.addClass('active');
	});

	$('ul.tabs__caption').on('click', 'li:not(.active)', function() {
		var index = $(this).index();
		$(this).addClass('active')
			.siblings()
			.removeClass('active')
			.closest('div.tabs')
			.find('div.tabs__content')
			.removeClass('active')
			.eq(index)
			.addClass('active');
		
		if (serviceAnchors[index]) {
			window.location.hash = serviceAnchors[index];
		}
		var ulIndex = $('ul.tabs__caption').index($(this).parents('ul.tabs__caption'));
		localStorage.removeItem('tab' + ulIndex);
		localStorage.setItem('tab' + ulIndex, $(this).index());
	});
	
	/* Items Height */
	if ($('.scheme-unit').length) {
		$('.scheme-unit .inner-desc').setItemsHeight({
			media: 950,
			parent: '.description'
		});
		$('.tabs__caption').on('click', 'li:not(.active)', function() {
			$('.scheme-unit .inner-desc').setItemsHeight('update');
		});
	}

});