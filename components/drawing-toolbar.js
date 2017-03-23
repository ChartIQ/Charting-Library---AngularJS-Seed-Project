function DrawingToolbar($rootScope, $filter) {
	var ctrl = this;
	ctrl.launchToolbar=false;
	ctrl.activeOutput={};
	ctrl.tools=CIQ.Drawing.getDrawingToolList({});
	//This array is needed so we can use orderBy
	ctrl.arrOfTools = Object.keys(ctrl.tools).map(function(key) {
		return ctrl.tools[key];
	});
	ctrl.toolParams=false;
	ctrl.selectedTool=false;
	ctrl.fillColor=false;
	ctrl.lineColor=false;
	ctrl.lineWidth=false;
	ctrl.pattern=false;
	ctrl.selectedLineClass="ciq-solid-1";

	ctrl.$postLink=function(){
		$rootScope.$on('toggleDrawingToolbar', function(event, ciq, cb){
			if(ciq) ctrl.ciq=ciq;
			ctrl.launchToolbar=!ctrl.launchToolbar;
			if(!ctrl.launchToolbar){
				ctrl.selectedTool=false;
				ctrl.toolParams=false;
				ctrl.fillColor=false;
				ctrl.lineColor=false;
				ctrl.lineWidth=false;
				ctrl.pattern=false;
			}
			cb(ctrl.launchToolbar);
		});
		$rootScope.$on('setColorFromPicker', function(event, params){
			if(ctrl.activeOutput.div==params.source) {
				ctrl.updateToolColors(params.color, params.params);
				ctrl.activeOutput.div.style.backgroundColor=CIQ.hexToRgba('#'+params.color);
			}
		});
	};
	ctrl.setTool=function(tool){
		// Set all the info for the toolbar
		ctrl.selectedTool=$filter('titlecase')(tool);
		ctrl.toolParams = CIQ.Drawing.getDrawingParameters(ctrl.ciq, tool);
		ctrl.fillColor=ctrl.toolParams.fillColor;
		if(ctrl.toolParams.color=="auto") ctrl.lineColor="white";
		else ctrl.lineColor=ctrl.toolParams.color;
		ctrl.lineWidth=ctrl.toolParams.lineWidth;
		ctrl.pattern=ctrl.toolParams.pattern;
		// Activate the tool
		ctrl.ciq.changeVectorType(tool);
	};
	ctrl.launchColorpicker=function(setting, event){
		ctrl.activeOutput['div']=event.target;
		$rootScope.$broadcast('launchColorPicker', {
			component: this,
			swatch: event.target,
			params:setting
		});
	};
	ctrl.updateToolColors=function(color, settings){
		if(settings.params=="drawingFill"){
			ctrl.ciq.currentVectorParameters.fillColor="#"+color;
		}
		else if(settings.params=="drawingLine"){
			ctrl.ciq.currentVectorParameters.currentColor="#"+color;
		}
	};
	ctrl.setLinePattern=function(newClass, newWeight, newPattern){
		// Set the info for the toolbar menu
		ctrl.selectedLineClass=newClass;
		// Activate the new parameters
		ctrl.ciq.currentVectorParameters.lineWidth=newWeight;
		ctrl.ciq.currentVectorParameters.pattern=newPattern;
	}
}

angular.module('cqNgApp').component('drawingToolbar', {
	controller:DrawingToolbar,
	templateUrl: 'templates/drawing-toolbar.html',
	controllerAs:'drawingToolbar'
});
