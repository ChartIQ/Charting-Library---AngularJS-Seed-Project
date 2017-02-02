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
	angular.bootstrap(document,['cqNgApp']);
});

// Create the app module
angular.module('cqNgApp', []);

// Here are all the filters used in the app
angular.module('cqNgApp').filter('periodicity', function(){
	return function(chartLayout,periodicityOptions){
		if(chartLayout) {
			var selected;
			for(var i=0; i<periodicityOptions.length; i++){
				if(periodicityOptions[i].interval==chartLayout.interval && periodicityOptions[i].period==chartLayout.periodicity)
					selected=periodicityOptions[i];
			}
			return selected.label;
		}
	}
});
angular.module('cqNgApp').filter('chartType', function(){
	return function(chartLayout,chartTypeOptions){
		if(chartLayout) {
			var selected;
			for(var i=0; i<chartTypeOptions.length; i++){
				if(chartTypeOptions[i].type==chartLayout.chartType)
					selected=chartTypeOptions[i];
			}
			return selected.label;
		}
	}
});

