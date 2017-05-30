// Define our main angular module
angular
	.module('cqNgApp', [])
	// Inject constants to avoid using globals inside the app:
	// https://github.com/johnpapa/angular-styleguide/tree/master/a1#style-y240
	.constant('$$$', window.$$$)
	.constant('CIQ', window.CIQ)
	// Normally you would define filters in their own dedicated files, but for
	// convenience in our example we've defined them in the main app file.
	.filter('periodicity', [function(){
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
	}])
	.filter('chartType', [function(){
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
	}])
	.filter('titlecase', [function() {
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
	}])
