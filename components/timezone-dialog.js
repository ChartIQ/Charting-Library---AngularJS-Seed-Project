TimezoneDialog.$inject = ['$scope'];

function TimezoneDialog($scope) {
	var ctrl = this;
	ctrl.launchDialog=false;
	ctrl.timezones=CIQ.timeZoneMap;
	//This array is needed so we can use orderBy
	ctrl.arrOfTimezones = Object.keys(ctrl.timezones).map(function(key) {
		return ctrl.timezones[key];
	});
	ctrl.myZone=true; //default behavior

	ctrl.$postLink=function(){
		$scope.$on('showTimezoneDialog', function(event, ciq){
			ctrl.ciq=ciq;
			ctrl.launchDialog=true;
		});
	};
	ctrl.closeMe=function(){
		ctrl.launchDialog=false;
	};
	ctrl.setTimezone=function(zone){
		ctrl.ciq.setTimeZone(ctrl.ciq.dataZone, zone);
		if(ctrl.ciq.chart.symbol) ctrl.ciq.draw();
		ctrl.myZone=false;
		ctrl.launchDialog=false;
	};
	ctrl.setMyTimezone=function(){
		ctrl.ciq.defaultDisplayTimeZone=null;
		for(var i=0;i<CIQ.ChartEngine.registeredContainers.length;i++){
			var stx=CIQ.ChartEngine.registeredContainers[i].stx;
			stx.displayZone=null;
			ctrl.myZone=true;
			stx.setTimeZone();

			if(stx.displayInitialized) stx.draw();
		}
		if(ctrl.ciq.chart.symbol) ctrl.ciq.draw();
		ctrl.closeMe();
	};
}

angular.module('cqNgApp').component('timezoneDialog', {
	controller:TimezoneDialog,
	templateUrl: 'templates/timezone-dialog.html',
	controllerAs:'timezoneDialog'
});
