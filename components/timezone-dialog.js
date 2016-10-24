function TimezoneDialog($scope) {
	var ctrl = this;
	ctrl.launchDialog=false;
	ctrl.timezones=CIQ.TimeZoneWidget.timeZoneMap;

	ctrl.$postLink=function(){
		CIQ.TimeZoneWidget.init();
		$scope.$on('showTimezoneDialog', function(event, ciq){
			ctrl.ciq=ciq;
			ctrl.launchDialog=true;
		});
	};
	ctrl.closeMe=function(){
		ctrl.launchDialog=false;
	};
	ctrl.setTimezone=function(zone){
		CIQ.TimeZoneWidget.setTimeZone(zone);
	};
}

angular.module('cqNgApp').component('timezoneDialog', {
	controller:TimezoneDialog,
	templateUrl: 'templates/timezone-dialog.html',
	controllerAs:'timezoneDialog'
});