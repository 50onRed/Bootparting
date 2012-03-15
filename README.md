# Bootparting

A quick jquery plugin to provide dayparting (weekly scheduling) controls to bootstrap sites.
Tested against:

* Bootstrap 2.0.2
* jQuery 1.7.1

Works well on:

* Firefox (latest)
* Chrome (latest)
* IE8+

Is really ugly on:

* IE6 (of course)

## How to use

### HTML:
	<form action='#' method='post'>
		<table class='table' id='bootparting'></table>
		<input type='submit' value='Create Schedule' />
	</form>

### Javascript:
	$(function() {
		$('#bootparting').bootparting();
	});

### Server side:
In addition to other form elements, an element called bootpart_schedule will be provided in json format.
