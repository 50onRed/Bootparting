!function($) {
	var Daypart = function(element, options) {
		this.init('daypart', element, options);
	};

	Daypart.prototype = {
		constructor: Daypart,
		element: null,
		days: {0: 'Sun',1: 'Mon',2: 'Tue',3: 'Wed',4: 'Thu',5: 'Fri',6: 'Sat'},
		hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
		rows: null,
		cols: null,

		init: function(type, element, options) {
			this.element = element;
			this.rows = {};
			this.cols = {};
			
			this.element.appendChild(this.create_head());
			this.element.appendChild(this.create_body());
		},

		create_head: function() {
			var thead = document.createElement('thead');
			var tr = document.createElement('tr');
			var th = document.createElement('th');
			tr.appendChild(th);

			for (var day_index in this.days) {
				var th = document.createElement('th');
				th.innerText = this.days[day_index];
				tr.appendChild(th);
			}

			thead.appendChild(tr);
			return thead;
		},

		create_body: function() {
			var tbody = document.createElement('tbody');
			for (var hour_index in this.hours) {
				this.rows[hour_index] = {};

				var tr = document.createElement('tr');
				var hour = this.hours[hour_index];
	
				var td = document.createElement('td');
				td.innerText = this.get_display_hour(hour);
				tr.appendChild(td);
					
				for (var day_index in this.days) {
					var td = document.createElement('td');
					var check = document.createElement('input');
					check.type = 'checkbox';

					this.rows[hour_index][day_index] = check;
					if (!(day_index in this.cols)) {
						this.cols[day_index] = {};
					}
					
					this.cols[day_index][hour_index] = check;

					td.appendChild(check);
					tr.appendChild(td);
				}


				tbody.appendChild(tr);
			}

			return tbody;
		},

		get_display_hour: function(hour) {
			return (hour < 10) ? '0' + hour + ':00' : hour + ':00';
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
