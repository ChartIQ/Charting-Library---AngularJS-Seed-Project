OverlayMenu.$inject = ['$scope', '$rootScope'];

function OverlayMenu($scope, $rootScope) {
	var ctrl = this;
	ctrl.launchMenu = null;
	ctrl.top = 0;
	ctrl.left = 0;

	ctrl.$postLink = function () {
		$scope.$on('showOverlayMenu', function (event, params) {
			ctrl.ciq = params.ciq;
			ctrl.sd = params.sd;
			ctrl.launchMe();
		});
	};

	ctrl.closeMe = function () {
		ctrl.launchMenu = null;
	};

	ctrl.launchMe = function () {
		ctrl.launchMenu = true;
		ctrl.top = ctrl.ciq.cy + 'px';
		ctrl.left = ctrl.ciq.cx + 'px';
		$scope.$apply();
	};

	ctrl.clickHandler = function (event) {
		if (event === 'edit') {
			$rootScope.$broadcast('launchStudyDialog', {sd: ctrl.sd, stx: ctrl.ciq});
		}
		else {
			$rootScope.$broadcast('removeStudy', {sd: ctrl.sd, stx: ctrl.ciq});
		}
		ctrl.closeMe();
	};
}

angular.module('cqNgApp').component('overlayMenu', {
	controller: OverlayMenu,
	templateUrl: 'templates/overlay-menu.html',
	controllerAs: 'overlayMenu'
});
