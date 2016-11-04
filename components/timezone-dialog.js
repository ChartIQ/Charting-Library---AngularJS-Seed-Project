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
		ctrl.ciq.setTimeZone(ctrl.ciq.dataZone, zone);
		if(ctrl.ciq.chart.symbol) ctrl.ciq.draw();
		ctrl.launchDialog=false;
	};
}

angular.module('cqNgApp').component('timezoneDialog', {
	controller:TimezoneDialog,
	templateUrl: 'templates/timezone-dialog.html',
	controllerAs:'timezoneDialog'
});