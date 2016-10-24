function CqNgUi($element,$scope, $rootScope){
	var ctrl=this;

	ctrl.$postLink=function(){
		$scope.example3=$element[0].baseURI.endsWith('3.html'); //part of the UI is only for example-3
		$rootScope.$on('updateThemeList', function(event, themeObj, themeName){
			if(themeName){
				var duplicate=false;
				var newTheme = {"name": themeName, "settings": themeObj};
				for(var i=0; i<ctrl.themes.length; i++){
					if(ctrl.themes[i].name==themeName) {
						ctrl.themes[i].settings = newTheme.settings;
						duplicate=true;
					}
				}
				if(!duplicate)
					ctrl.themes.push(newTheme);
				$rootScope.$broadcast('updateTheme', newTheme);
			}
			else console.error("Please name your custom theme.");
		});
	};
	ctrl.toggleCrosshair=function(){
		$scope.$broadcast('toggleCrosshair');
	};
	ctrl.launchStudyDialog=function(study){
		$rootScope.$broadcast('showStudyDialog',study, ctrl.cqNgChart.ciq);
	};
	ctrl.handleThemeSelect=function(theme){
		if(theme.name=="+ New Theme"){
			$rootScope.$broadcast('showThemeDialog', ctrl.cqNgChart.ciq);
		}
		else{
			$rootScope.$broadcast('updateTheme', theme);
		}
	};
	ctrl.launchTimezoneDialog=function(){
		$rootScope.$broadcast('showTimezoneDialog', ctrl.cqNgChart.ciq);
	};

	// Data for all the menus
	ctrl.themes=[{"name":"+ New Theme"}];

	ctrl.studies={
		list:Object.keys(CIQ.Studies.studyLibrary),
		selectedOption:''
	};

	ctrl.periodicity={
		options: [
			{
				period: 1,
				interval: 1,
				label: '1 Min',
			},
			{
				period: 1,
				interval: 3,
				label: '3 Min',
			},
			{
				period: 1,
				interval: 5,
				label: '5 Min',
			},
			{
				period: 1,
				interval: 10,
				label: '10 Min',
			},
			{
				period: 3,
				interval: 5,
				label: '15 Min',
			},
			{
				period: 1,
				interval: 30,
				label: '30 Min',
			},
			{
				period: 2,
				interval: 30,
				label: '1 Hour',
			},
			{
				period: 8,
				interval: 30,
				label: '4 Hour',
			},
			{
				period: 1,
				interval:'day',
				label: '1 Day',
			},
			{
				period: 2,
				interval:'day',
				label: '2 Day',
			},
			{
				period: 3,
				interval:'day',
				label: '3 Day',
			},
			{
				period: 5,
				interval:'day',
				label: '5 Day',
			},
			{
				period: 10,
				interval:'day',
				label: '10 Day',
			},
			{
				period: 20,
				interval:'day',
				label: '20 Day',
			},
			{
				period: 1,
				interval:'week',
				label: '1 Wk',
			},
			{
				period: 1,
				interval:'month',
				label: '1 Mon',
			},
		],
	};

	ctrl.chartTypes = {
		types: [
			{
				type: 'bar',
				label: 'bar',
			},
			{
				type: 'candle',
				label: 'candle',
			},
			{
				type: 'colored_bar',
				label: 'colored bar',
			},
			{
				type: 'hollow_candle',
				label: 'hollow candle',
			},
			{
				type: 'line',
				label: 'line',
			},
			{
				type: 'mountain',
				label: 'mountain',
			},
			{
				type: 'volume_candle',
				label: 'volume candle',
			},
			{
				type: 'heikinashi',
				label: 'Heikin-Ashi',
			},
			{
				type: 'kagi',
				label: 'kagi',
				aggregationEdit: {
					title: 'Set Reversal Percentage',
					inputs: [
						{
							lookup: 'kagi',
							label: 'kagi',
						}
					]
				}
			},
			{
				type: 'linebreak',
				label: 'line break',
				aggregationEdit: {
					title: 'Set Price Lines',
					inputs: [
						{
							lookup: 'priceLines',
							label: 'price line'
						}
					]
				}
			},
			{
				type: 'renko',
				label: 'renko',
				aggregationEdit: {
					title: 'Set Range',
					inputs: [
						{
							lookup: 'renko',
							label: 'renko'
						}
					]
				}
			},
			{
				type: 'rangebars',
				label: 'range bars',
				aggregationEdit: {
					title: 'Set Range',
					inputs: [
						{
							lookup: 'range',
							label: 'range'
						}
					]
				}
			},
			{
				type: 'pandf',
				label: 'point & figure',
				aggregationEdit: {
					title: 'Set Point & Figure Parameters',
					inputs: [
						{
							lookup: 'pandf.box',
							label: 'box'
						},
						{
							lookup: 'pandf.reversal',
							label: 'reversal'
						}
					]
				}
			}
		],
		selectedOption: {type:'bar', label:'bar'}
	};
}

angular.module('cqNgApp').component('cqNgUi', {
	controller:CqNgUi,
	templateUrl: 'templates/cq-ng-ui.html',
	controllerAs:'cqNgUi',
});