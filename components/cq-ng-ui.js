function CqNgUi($element,$scope, $rootScope){
	var ctrl=this;

	ctrl.$postLink=function(){
		$scope.example3=$element[0].baseURI.endsWith('3.html'); //part of the UI is only for example-3
		$rootScope.$on('updateThemeList', function(event, themeObj, themeName){
			if(themeName){ // we aren't going to allow unnamed themes to be created
				var duplicate=false;
				var newTheme = {"name": themeName, "settings": themeObj};
				for(var i=0; i<ctrl.themes.length; i++){
					if(ctrl.themes[i].name==themeName) {
						ctrl.themes[i].settings = newTheme.settings;
						duplicate=true;
					}
				}
				if(!duplicate) { // if it's duplicate we have updated that existing theme
					ctrl.themes.splice((ctrl.themes.length-1), 0, newTheme);
					//ctrl.themes.push(newTheme);
				}
				$rootScope.$broadcast('updateTheme', newTheme);
			}
			else console.error("Please name your custom theme.");
		});
	};

	ctrl.addStudy=function(study){
		$rootScope.$broadcast('addStudy',study, ctrl.cqNgChart.ciq);
	};

	ctrl.launchTimezoneDialog=function(){
		$rootScope.$broadcast('showTimezoneDialog', ctrl.cqNgChart.ciq);
	};

	ctrl.handleThemeSelect=function(theme){
		if(theme.name=="+ New Theme"){
			$rootScope.$broadcast('showThemeDialog', ctrl.cqNgChart.ciq);
		}
		else{
			$rootScope.$broadcast('updateTheme', theme, ctrl.cqNgChart.ciq);
		}
	};

	// Data for all the menus
	ctrl.themes=[{
		"name": "Default",
		"settings": // the default theme settings
			{
				"chart": {
					"Axis Text": { "color": "rgba(197,199,201,1)" },
					"Background": { "color": "rgba(28,42,53,1)" },
					"Grid Dividers": { "color": "rgba(37,55,70,1)" },
					"Grid Lines": { "color": "rgba(33,50,63,1)" }
				},
				"chartTypes": {
					"Candle/Bar": {
						"down": { "border": "rgba(227,70,33,1)", "color": "rgba(184,44,12,1)", "wick": "rgba(0,0,0,1)" },
						"up": { "border": "rgba(184,222,168,1)", "color": "rgba(140,193,118,1)", "wick": "rgba(0,0,0,1)" }
					},
					"Line": { "color": "rgba(0,0,0,1)" },
					"Mountain": { "color": "rgba(102,202,196,0.498039)" }
				}
			}
	},
		{"name":"+ New Theme"}];

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
				label: 'Bar',
			},
			{
				type: 'candle',
				label: 'Candle',
			},
			{
				type: 'colored_bar',
				label: 'Colored bar',
			},
			{
				type: 'hollow_candle',
				label: 'Hollow candle',
			},
			{
				type: 'line',
				label: 'Line',
			},
			{
				type: 'mountain',
				label: 'Mountain',
			},
			{
				type: 'volume_candle',
				label: 'Volume candle',
			},
			{
				type: 'heikinashi',
				label: 'Heikin-Ashi',
			},
			{
				type: 'kagi',
				label: 'Kagi',
				aggregationEdit: {
					title: 'Set Reversal Percentage',
					inputs: [
						{
							lookup: 'kagi',
							label: 'Kagi',
						}
					]
				}
			},
			{
				type: 'linebreak',
				label: 'Line break',
				aggregationEdit: {
					title: 'Set Price Lines',
					inputs: [
						{
							lookup: 'priceLines',
							label: 'Price line'
						}
					]
				}
			},
			{
				type: 'renko',
				label: 'Renko',
				aggregationEdit: {
					title: 'Set Range',
					inputs: [
						{
							lookup: 'renko',
							label: 'Renko'
						}
					]
				}
			},
			{
				type: 'rangebars',
				label: 'Range bars',
				aggregationEdit: {
					title: 'Set Range',
					inputs: [
						{
							lookup: 'range',
							label: 'Range'
						}
					]
				}
			},
			{
				type: 'pandf',
				label: 'Point & Figure',
				aggregationEdit: {
					title: 'Set Point & Figure Parameters',
					inputs: [
						{
							lookup: 'pandf.box',
							label: 'Box'
						},
						{
							lookup: 'pandf.reversal',
							label: 'Reversal'
						}
					]
				}
			}
		],
		selectedOption: {type:'bar', label:'Bar'}
	};
}

angular.module('cqNgApp').component('cqNgUi', {
	controller:CqNgUi,
	templateUrl: 'templates/cq-ng-ui.html',
	controllerAs:'cqNgUi',
});