ThemeDialog.$inject = ['$scope', '$rootScope'];

function ThemeDialog($scope, $rootScope) {
	var ctrl = this;
	ctrl.launchDialog = false;
	ctrl.activeOutput = {};
	ctrl.themeHelper = {};

	ctrl.$postLink = function () {
		$scope.$on('showThemeDialog', function (event, ciq) {
			ctrl.ciq = ciq;
			ctrl.themeHelper = new CIQ.ThemeHelper({'stx': ctrl.ciq});
			$scope.candleUp = ctrl.themeHelper.settings.chartTypes["Candle/Bar"].up;
			$scope.candleDown = ctrl.themeHelper.settings.chartTypes["Candle/Bar"].down;
			$scope.lineBarChart = ctrl.themeHelper.settings.chartTypes["Line"];
			$scope.mountainChart = ctrl.themeHelper.settings.chartTypes["Mountain"];
			$scope.axis = ctrl.themeHelper.settings.chart["Axis Text"];
			$scope.background = ctrl.themeHelper.settings.chart["Background"];
			$scope.gridDividers = ctrl.themeHelper.settings.chart["Grid Dividers"];
			$scope.gridLines = ctrl.themeHelper.settings.chart["Grid Lines"];
			ctrl.launchDialog = true;
		});
		$rootScope.$on('setColorFromPicker', function (event, params) {
			if (ctrl.activeOutput.div === params.source) {
				ctrl.updateThemeHelper(params.color, params.params);
				ctrl.activeOutput.div.style.backgroundColor = CIQ.hexToRgba('#' + params.color);
			}
		});
		$rootScope.$on('updateTheme', function (event, theme, chart) {
			if (theme.name === "Default") {
				ctrl.themeHelper = new CIQ.ThemeHelper({'stx': chart});
			}
			ctrl.themeHelper.settings = theme.settings;
			ctrl.themeHelper.update();
		});
	};

	ctrl.updateThemeHelper = function (color, setting) {
		switch (setting.params) {
			case 'candleUp':
				ctrl.themeHelper.settings.chartTypes["Candle/Bar"].up.color = CIQ.hexToRgba('#' + color);
				break;
			case 'candleDown':
				ctrl.themeHelper.settings.chartTypes["Candle/Bar"].down.color = CIQ.hexToRgba('#' + color);
				break;
			case 'wickUp':
				ctrl.themeHelper.settings.chartTypes["Candle/Bar"].up.wick = CIQ.hexToRgba('#' + color);
				break;
			case 'wickDown':
				ctrl.themeHelper.settings.chartTypes["Candle/Bar"].down.wick = CIQ.hexToRgba('#' + color);
				break;
			case 'borderUp':
				ctrl.themeHelper.settings.chartTypes["Candle/Bar"].up.border = CIQ.hexToRgba('#' + color);
				break;
			case 'borderDown':
				ctrl.themeHelper.settings.chartTypes["Candle/Bar"].down.border = CIQ.hexToRgba('#' + color);
				break;
			case 'lineBar':
				ctrl.themeHelper.settings.chartTypes["Line"].color = CIQ.hexToRgba('#' + color);
				break;
			case 'mountain':
				ctrl.themeHelper.settings.chartTypes["Mountain"].color = CIQ.hexToRgba('#' + color);
				break;
			case 'chartBackground':
				ctrl.themeHelper.settings.chart["Background"].color = CIQ.hexToRgba('#' + color);
				break;
			case 'dividers':
				ctrl.themeHelper.settings.chart["Grid Dividers"].color = CIQ.hexToRgba('#' + color);
				break;
			case 'lines':
				ctrl.themeHelper.settings.chart["Grid Lines"].color = CIQ.hexToRgba('#' + color);
				break;
			case 'axis':
				ctrl.themeHelper.settings.chart["Axis Text"].color = CIQ.hexToRgba('#' + color);
				break;
		}
	};

	ctrl.closeMe = function (isUpdate) {
		if (isUpdate) {
			var clone = CIQ.clone(ctrl.themeHelper.settings);
			$rootScope.$broadcast('updateThemeList', clone, ctrl.customName);
		}
		ctrl.launchDialog = false;
	};

	ctrl.launchColorpicker = function (setting, event) {
		ctrl.activeOutput['div'] = event.target;
		$rootScope.$broadcast('launchColorPicker', {
			component: this,
			swatch: event.target,
			params: setting
		});
	};
}

angular.module('cqNgApp').component('themeDialog', {
	controller: ThemeDialog,
	templateUrl: 'templates/theme-dialog.html',
	controllerAs: 'themeDialog',
	bindings: {
		customName: '@'
	}
});
