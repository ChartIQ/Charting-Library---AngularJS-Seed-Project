// Configure requirejs. Otherwise the baseUrl would default to this directory
require.config({
	baseUrl: 'chartiq/js/',
});

// Define the AMD module for the library
define('chartIQ', ['../js/chartiq'], function (chartiq) {
	for (var key in chartiq) {
		window[key] = chartiq[key];
	}
	return chartiq;
});

// Require the library then bootstrap the app after the library is loaded
require(['chartIQ'], function(){
	angular.bootstrap(document,['cqNgApp']);
});

// Create the app module
angular.module('cqNgApp', []);

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

