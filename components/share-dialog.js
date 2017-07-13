function ShareDialog($rootScope, $scope) {
	var ctrl = this;
	ctrl.launchDialog=false;
	ctrl.ciq=null;
	ctrl.shareLink="";

	ctrl.$postLink=function(){
		$rootScope.$on('showShareDialog', function(event, params){
			ctrl.ciq=params;
			ctrl.showDialog();
		});
	};

	ctrl.showDialog=function(){
		ctrl.launchDialog=true;
	};

	ctrl.closeMe=function(){
		ctrl.launchDialog=false;
		ctrl.shareLink="";
	};

	ctrl.renderShareLink=function(){
		CIQ.Share.shareChart(ctrl.ciq, {}, function(link){
			ctrl.shareLink=link;
			$scope.$apply();
		});
	};
}

angular.module('cqNgApp').component('shareDialog', {
	controller:ShareDialog,
	templateUrl: 'templates/share-dialog.html',
	controllerAs:'shareDialog'
});
