// Configure requirejs. Otherwise the baseUrl would default to this directory
// TODO change baseUrl to match where your ChartIQ js folder is located. This is how require.js knows where to start looking.
require.config({
	baseUrl: 'chartiq/js/',
});

// Define the AMD module for the library
// ['chartiq'] refers to chartiq.js in the ChartIQ library. Requiring this file kicks off require.js and grabs everything that is needed from the library.
define('chartIQ', ['chartiq'], function (chartiq) {
	for (var key in chartiq) {
		window[key] = chartiq[key];
	}
	return chartiq;
});

// Require the AMD module then bootstrap the app after the library is loaded
require(['chartIQ'], function(){
	angular.bootstrap(document,['cqNgApp'], {
		strictDi: true
	});
});

// Create the app module
angular.module('cqNgApp', []);

// Here are all the filters used in the app
angular.module('cqNgApp').filter('periodicity', [function(){
	return function(chartLayout,periodicityOptions){
		if(chartLayout) {
			var selected;
			for(var i=0; i<periodicityOptions.length; i++){
				if(periodicityOptions[i].interval==chartLayout.interval && periodicityOptions[i].period==chartLayout.periodicity)
					selected=periodicityOptions[i];
			}
			return selected.label;
		}
	};
}]);
angular.module('cqNgApp').filter('chartType', [function(){
	return function(chartLayout,chartTypeOptions){
		if(chartLayout) {
			var selected;
			for(var i=0; i<chartTypeOptions.length; i++){
				if(chartTypeOptions[i].type==chartLayout.chartType)
					selected=chartTypeOptions[i];
			}
			return selected.label;
		}
	};
}]);
angular.module('cqNgApp').filter('titlecase', [function() {
	return function (input) {
		var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

		input = input.toLowerCase();
		return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
			if (index > 0 && index + match.length !== title.length &&
				match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
				(title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
				title.charAt(index - 1).search(/[^\s-]/) < 0) {
				return match.toLowerCase();
			}

			if (match.substr(1).search(/[A-Z]|\../) > -1) {
				return match;
			}

			return match.charAt(0).toUpperCase() + match.substr(1);
		});
	};
}]);
