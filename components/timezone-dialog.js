function TimezoneDialog($scope) {
	var ctrl = this;
	ctrl.launchDialog=false;
	ctrl.timezones=CIQ.timeZoneMap;

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
		for(var i=0;i<CIQ.ChartEngine.registeredContainers.length;i++){
			var stx=CIQ.ChartEngine.registeredContainers[i].stx;
			stx.setTimeZone(stx.dataZone, zone);
			if(stx.chart.symbol) stx.draw();
		}
		
		ctrl.launchDialog=false;
	};
}

angular.module('cqNgApp').component('timezoneDialog', {
	controller:TimezoneDialog,
	templateUrl: 'templates/timezone-dialog.html',
	controllerAs:'timezoneDialog'
});