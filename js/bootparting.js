!function($) {
	"use strict";

	var Bootparting = function(element, options) {
		this.init('bootparting', element, options);
	};

	Bootparting.prototype = {
		constructor: Bootparting,
		element: null,
		days: {0: 'Sun',1: 'Mon',2: 'Tue',3: 'Wed',4: 'Thu',5: 'Fri',6: 'Sat'},
		hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
		headers: null,
		rows: null,
		cols: null,

		init: function(type, element, options) {
			this.element = element;
			this.headers = {'hours': [], 'days': []};
			this.rows = {};
			this.cols = {};
			
			this.element.appendChild(this.create_head());
			this.element.appendChild(this.create_body());
			this.wire_headers();
			this.wire_form();
		},

		wire_form: function() {
			var form = $(this.element).parent('form'); 
			var hidden = document.createElement('input');
			var bootparting = this;
			
			hidden.name = 'bootpart_schedule';
			hidden.type = 'hidden';
			$(hidden).appendTo($(form));
			
			$(form).submit(function(){
				$(hidden).val(JSON.stringify(bootparting.generate_output_object()));
			});
		},

		/* Wire up the header checkboxes so that they function as toggles for rows & cols */
		wire_headers: function() {
			var bootparting = this;
			for (var hour_index in this.headers['hours']) {
				var hour_key = hour_index;

				/* Use closures to handle column toggling */
				this.headers['hours'][hour_index].onchange = (function(hour_key, bootparting) {
					return function() {
						for (day_key in bootparting.rows[hour_key]) {
							bootparting.rows[hour_key][day_key].checked = bootparting.headers['hours'][hour_key].checked;
						}
					};
				})(hour_key, bootparting);
			}

			/* Use closures to handle row toggling */
			for (var day_index in this.headers['days']) {
				var day_key = day_index;
				this.headers['days'][day_index].onchange = (function(day_key, bootparting) {
					return function() {
						for (hour_key in bootparting.cols[day_key]) {
							bootparting.cols[day_key][hour_key].checked = bootparting.headers['days'][day_key].checked;
						}
					}
				})(day_key, bootparting);
			}
		},

		/* Create the thead element and daily column headers */
		create_head: function() {
			var thead = document.createElement('thead');
			var tr = document.createElement('tr');
			var th = document.createElement('th');
			tr.appendChild(th);

			for (var day_index in this.days) {
				var th = document.createElement('th');
				var label = document.createElement('label');
				var input_id = 'day_' + day_index + '_header';
				$(label).attr('for', input_id);
				label.innerText = ' ' + this.days[day_index];
				
				var checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.id = input_id;
				checkbox.checked = true;
				checkbox.className = 'pull-left';

				this.headers['days'][day_index] = checkbox;

				th.appendChild(checkbox);
				th.appendChild(label);

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

				var input_id = 'hour_' + hour_index + '_check';
				var label = document.createElement('label');
				$(label).attr('for', input_id);
				label.innerText = this.get_display_hour(hour) + ' ';
				label.className = 'pull-left';

				var check = document.createElement('input');
				check.type = 'checkbox';
				check.id = input_id;
				check.checked = true;
				this.headers['hours'][hour_index] = check;

				td.appendChild(label);
				td.appendChild(check);

				tr.appendChild(td);
					
				for (var day_index in this.days) {
					var td = document.createElement('td');
					var check = document.createElement('input');
					check.type = 'checkbox';
					check.checked = true;
					

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


		/* Geneate an object that has simple booleans for the grid, ie: schedule['Mon'][6] = true */
		generate_output_object: function() {
			var schedule = {};
			for (var day_index in this.days) {
				var day = this.days[day_index];
				schedule[day] = {};
				for (var hour_index in this.hours) {
					var hour = this.hours[hour_index];
					schedule[day][hour] = this.rows[hour_index][day_index].checked;
				}
			}

			return schedule;
		},

		get_display_hour: function(hour) {
			return (hour < 10) ? '0' + hour + ':00' : hour + ':00';
		}
	};

	$.fn.bootparting = function(option) {
		return this.each(function() {
			var $this = $(this);
			var options = (typeof option == 'object') ? option : null;
			var bootparting = new Bootparting(this, options);
		});
	};
	$.fn.bootparting.Constructor = Bootparting;
}(window.jQuery);
