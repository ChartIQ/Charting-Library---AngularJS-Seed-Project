DrawingToolbar.$inject = ['$rootScope', '$filter'];

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
	ctrl.selectedLineClass=false;
	ctrl.fontSize=13;
	ctrl.fontFamily="Helvetica"; //defaults
	ctrl.fontSizeOptions=[8, 10, 12, 13, 14, 16, 20, 28, 36, 48, 64];
	ctrl.fontFamilyOptions=["Helvetica", "Courier", "Garamond", "Palatino", "Times New Roman"];
	ctrl.bold=false;
	ctrl.italic=false;
	ctrl.showFontOptions=false;

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
				ctrl.ciq.changeVectorType('');
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

		if(tool=='callout' || tool=='annotation') { // no need to do this every time
			// Sync the defaults for font tool
			var style = ctrl.ciq.canvasStyle("stx_annotation");

			var size = style.fontSize;
			ctrl.ciq.currentVectorParameters.annotation.font.size=size;
			ctrl.fontSize = size;
			ctrl.ciq.currentVectorParameters.annotation.font.family=style.fontFamily;
			ctrl.fontFamily = style.fontFamily;
			ctrl.ciq.currentVectorParameters.annotation.font.style=style.fontStyle;
			ctrl.ciq.currentVectorParameters.annotation.font.weight=style.fontWeight;
			ctrl.showFontOptions=true;
		}
		else{
			ctrl.showFontOptions=false;
		}
		ctrl.fillColor=ctrl.toolParams.fillColor;
		if(ctrl.toolParams.color=="auto") ctrl.lineColor="white";
		else ctrl.lineColor=ctrl.toolParams.color;
		ctrl.lineWidth=ctrl.toolParams.lineWidth;
		ctrl.pattern=ctrl.toolParams.pattern;
		ctrl.selectedLineClass="ciq-" + ctrl.pattern + '-' + ctrl.lineWidth;
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
			ctrl.ciq.changeVectorParameter("fillColor", "#"+color);
		}
		else if(settings.params=="drawingLine"){
			ctrl.ciq.changeVectorParameter("currentColor", "#"+color);
		}
	};
	ctrl.setLinePattern=function(newClass, newWidth, newPattern){
		// Set the info for the toolbar menu
		ctrl.selectedLineClass=newClass;
		// Activate the new parameters
		ctrl.ciq.changeVectorParameter("lineWidth", newWidth);
		ctrl.ciq.changeVectorParameter("pattern", newPattern);
	};
	ctrl.setFontSize=function(newSize){
		ctrl.fontSize=newSize+'px';
		ctrl.ciq.changeVectorParameter("fontSize", newSize+'px');
	};
	ctrl.setFontFamily=function(newFamily){
		ctrl.fontFamily=newFamily;
		ctrl.ciq.changeVectorParameter("fontFamily", newFamily);
	};
	ctrl.toggleStyle=function(newStyle){
		if(newStyle=='bold'){
			if(!ctrl.bold){
				ctrl.ciq.changeVectorParameter("fontWeight", "bold");
				ctrl.bold=true;
			}
			else{
				ctrl.ciq.changeVectorParameter("fontWeight", "normal");
				ctrl.bold=false;
			}
		}
		else if(newStyle=='italic'){
			if(!ctrl.italic){
				ctrl.ciq.changeVectorParameter("fontStyle", "italic");
				ctrl.italic=true;
			}
			else{
				ctrl.ciq.changeVectorParameter("fontStyle", "normal");
				ctrl.italic=false;
			}
		}
	};
}

angular.module('cqNgApp').component('drawingToolbar', {
	controller:DrawingToolbar,
	templateUrl: 'templates/drawing-toolbar.html',
	controllerAs:'drawingToolbar'
});
