!function($) {
	var Daypart = function(element, options) {
		this.init('daypart', element, options);
	};

	Daypart.prototype = {
		constructor: Daypart,
		init: function(type, element, options) {
			$("<thead><tr><th>Hello</th><th>world</th></tr></thead>").appendTo(element);	
		}

	};

	$.fn.daypart = function(option) {
		return this.each(function() {
			var $this = $(this);
			var options = (typeof option == 'object') ? option : null;
			var daypart = new Daypart(this, options);
		});
	};
	$.fn.daypart.Constructor = Daypart;
}(window.jQuery);
