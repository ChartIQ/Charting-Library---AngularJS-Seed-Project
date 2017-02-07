function CqNgChart($element, quoteFeed){
	var ctrl=this; //use ctrl as this for the sole purpose of consistency both in and out of the functions

	// postLink is the angular lifecycle hook that gets called after the compile function of a component
	// read about other lifecycle hooks here: https://toddmotto.com/angular-1-5-lifecycle-hooks
	ctrl.$postLink=function(){
		if(ctrl.parent) ctrl.parent.cqNgChart=ctrl; //here we give the UI (the parent) access to ourself (the chart)
		ctrl.initChart();
	};

	ctrl.setPeriodicity=function(period, interval){
		ctrl.ciq.setPeriodicityV2(period,interval);
	};

	ctrl.setChartType=function(type){
		if((type.aggregationEdit && ctrl.ciq.layout.aggregationType != type.type) || type.type == 'heikinashi'){
			//ctrl.ciq.setChartType('candle');
			ctrl.ciq.setAggregationType(type.type);
		} else {
			ctrl.ciq.setChartType(type.type);
		}
	};

	ctrl.toggleCrosshairs=function(){
		var state=ctrl.ciq.layout.crosshair;
		ctrl.ciq.layout.crosshair=!state;
	};

	ctrl.changeSymbol=function(){
		ctrl.ciq.newChart(ctrl.symbolInput);
	};

	ctrl.addComparison=function(){
		if(ctrl.symbolComparison) {
			// Note that this color generator has a bias toward darker colors. Just needed a quick solution here.
			function getRandomColor() {
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
				data: {useDefaultQuoteFeed: true},
				permanent:true
			});
			ctrl.symbolComparison=null;
		}
		else{
			console.log("Error: no symbol for comparison entered");
		}
	};

	ctrl.removeSeries=function(seriesName){
		ctrl.ciq.removeSeries(seriesName, ctrl.ciq.chart);
	};

	ctrl.initChart=function(){
		ctrl.ciq=new CIQ.ChartEngine({container:$$$("#chartContainer")});
		ctrl.attachFeed();
		if(ctrl.symbolInput) {
			ctrl.ciq.newChart(ctrl.symbolInput);
		} else ctrl.ciq.newChart("AAPL"); //AAPL is our default symbol
	};

	ctrl.attachFeed=function(){
		var qf=quoteFeed.makeFeed();
		ctrl.ciq.attachQuoteFeed(qf,{refreshInterval:1});
	};

	ctrl.set=function(multiplier, span){
		var params={
			multiplier:multiplier,
			span:span,
		};
		ctrl.ciq.setSpan(params, function(){
			console.log("span set");
		});
	};
}

// The chart component
angular.module('cqNgApp').component('cqNgChart', {
	require: {parent:'?^cqNgUi'}, //children can gain access to parent with angular
	controller:CqNgChart,
	templateUrl: 'templates/cq-ng-chart.html',
	controllerAs:'cqNgChart', //we will reference this component elsewhere with this name
	bindings:{
		symbolInput:'@',
		symbolComparison:'@',
	}
});


