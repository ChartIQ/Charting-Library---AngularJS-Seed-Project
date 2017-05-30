// The chart component
angular
	.module('cqNgApp')
	.component('cqNgChart', {
		require: {
			parent: '?^cqNgUi'
		}, //children can gain access to parent with angular
		controller: CqNgChart,
		templateUrl: 'templates/cq-ng-chart.html',
		controllerAs: 'cqNgChart', //we will reference this component elsewhere with this name
		bindings: {
			symbolInput: '@',
			symbolComparison: '@'
		}
	});

CqNgChart.$inject = ['$$$', '$timeout', 'CIQ', 'quoteFeed'];

function CqNgChart($$$, $timeout, CIQ, quoteFeed) {
	var ctrl = this; //use ctrl as this for the sole purpose of consistency both in and out of the functions
	ctrl.loader = null;

	// postLink is the angular lifecycle hook that gets called after the compile function of a component
	// read about other lifecycle hooks here: https://toddmotto.com/angular-1-5-lifecycle-hooks
	ctrl.$postLink = function () {
		if (ctrl.parent) ctrl.parent.cqNgChart = ctrl; //here we give the UI (the parent) access to ourself (the chart)
		ctrl.initChart();
	};

	ctrl.$onDestroy = function () {
		// This will remove the quoteDriver, styles and eventListeners for this ChartEngine instance.
		ctrl.ciq.destroy();
	};

	ctrl.showLoader = function () {
		ctrl.loader = true;
	};

	ctrl.hideLoader = function () {
		ctrl.loader = false;
	};

	ctrl.setPeriodicity = function (period, interval) {
		ctrl.showLoader();
		ctrl.ciq.setPeriodicityV2(period, interval);
		$timeout(function () {
			ctrl.hideLoader();
		}, 1000);
	};

	ctrl.setChartType = function (type) {
		if ((type.aggregationEdit && ctrl.ciq.layout.aggregationType !== type.type) || type.type === 'heikinashi') {
			//ctrl.ciq.setChartType('candle');
			ctrl.ciq.setAggregationType(type.type);
		} else {
			ctrl.ciq.setChartType(type.type);
		}
	};

	ctrl.toggleCrosshairs = function () {
		var state = ctrl.ciq.layout.crosshair;
		ctrl.ciq.layout.crosshair = !state;
	};

	ctrl.changeSymbol = function () {
		ctrl.showLoader();
		ctrl.ciq.newChart(ctrl.symbolInput);
		$timeout(function () {
			ctrl.hideLoader();
		}, 1000);
	};

	ctrl.addComparison = function () {
		if (ctrl.symbolComparison) {
			if (!ctrl.ciq.callbacks.symbolChange) ctrl.ciq.callbacks.symbolChange = this.updateComparisonSeries;
			// Note that this color generator has a bias toward darker colors. Just needed a quick solution here.
			var getRandomColor = function() {
				var letters = '0123456789ABCDEF';
				var color = '#';
				for (var i = 0; i < 6; i++) {
					color += letters[Math.floor(Math.random() * 16)];
				}
				return color;
			}

			ctrl.ciq.addSeries(ctrl.symbolComparison, {
				isComparison: true,
				color: getRandomColor(),
				data: {useDefaultQuoteFeed: true}
			});
			ctrl.symbolComparison = null;
		}
		else {
			console.log("Error: no symbol for comparison entered");
		}
	};

	ctrl.updateComparisonSeries = function () {
		if (arguments[0].action === 'remove-series') {
			var index = ctrl.ciq.chart.series.indexOf(arguments[0].symbolObject, 0);
			if (index > -1) {
				ctrl.ciq.chart.series.splice(index, 1);
			}
			ctrl.removeSeries(arguments[0].symbol);
		}
	};

	ctrl.removeSeries = function (seriesName) {
		ctrl.ciq.removeSeries(seriesName, ctrl.ciq.chart);
	};

	ctrl.initChart = function () {
		ctrl.ciq = new CIQ.ChartEngine({container: $$$("#chartContainer")});
		ctrl.attachFeed();
		if (ctrl.symbolInput) {
			ctrl.ciq.newChart(ctrl.symbolInput);
		} else ctrl.ciq.newChart("AAPL"); //AAPL is our default symbol
	};

	ctrl.attachFeed = function () {
		var qf = quoteFeed.makeFeed();
		ctrl.ciq.attachQuoteFeed(qf, {refreshInterval: 1});
	};

	ctrl.set = function (multiplier, span) {
		ctrl.showLoader();
		var params = {
			multiplier: multiplier,
			span: span,
		};
		ctrl.ciq.setSpan(params, function () {
			console.log("span set");
		});
		$timeout(function () {
			ctrl.hideLoader();
		}, 1000);
	};

	ctrl.updateSymbolInput = function (event) {
		if (event.type === "click") {
			ctrl.symbolInput = event.target.previousSibling.value;
			ctrl.changeSymbol();
			event.target.previousSibling.value = "";
		}
		else if (event.type === "keypress" && event.keyCode === 13) {
			ctrl.symbolInput = event.target.value;
			ctrl.changeSymbol();
			event.target.value = "";
		}
	};

	ctrl.updateSymbolComparison = function (event) {
		if (event.type === "click") {
			ctrl.symbolComparison = event.target.previousSibling.value;
			ctrl.addComparison();
			event.target.previousSibling.value = "";
		}
		else if (event.type === "keypress" && event.keyCode === 13) {
			ctrl.symbolComparison = event.target.value;
			ctrl.addComparison();
			event.target.value = "";
		}
	};
}
