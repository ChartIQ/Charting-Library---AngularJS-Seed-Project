function StudyDialog($scope, $rootScope) {
	var ctrl = this;
	ctrl.launchDialog=false;
	ctrl.studyHelper={};
	ctrl.activeOutput={};

	ctrl.$postLink=function(){
		$rootScope.$on('addStudy', function(event, study, ciq){
			var self=this;
			function closure(fc){
				return function(){
					fc.apply(self, arguments);
				};
			}
			ciq.callbacks.studyOverlayEdit=closure(ctrl.removeStudy);
			ciq.callbacks.studyPanelEdit=closure(ctrl.showDialog);
			CIQ.Studies.addStudy(ciq, study);
		});
		$rootScope.$on('setColorFromPicker', function(event, params){
			if(ctrl.activeOutput.div==params.source) {
				ctrl.updateStudyHelperColors(params.color, params.params);
				ctrl.activeOutput.div.style.backgroundColor=CIQ.hexToRgba('#'+params.color);
			}
		});
	};
	
	ctrl.showDialog=function(study, ciq){
		ctrl.studyHelper=new CIQ.Studies.DialogHelper({name:study,stx:ciq});
		$scope.inputs=ctrl.studyHelper.inputs;
		$scope.outputs=ctrl.studyHelper.outputs;
		$scope.parameters=ctrl.studyHelper.parameters;
		$scope.studyId=ctrl.studyHelper.name;
		$scope.studyName=ctrl.studyHelper.title;
		$scope.$apply(function(){
			ctrl.launchDialog=true;
		});
	};

	ctrl.removeStudy=function(args){
		CIQ.Studies.removeStudy(args.stx,args.sd);
	};

	ctrl.stringify=function(nonString){
		return nonString.toString();
	};

	ctrl.updateStudyHelperColors=function(color, params){
		for (var x=0; x < ctrl.studyHelper.outputs.length; x++) {
			if (ctrl.studyHelper.outputs[x].name==params.params.name) {
				ctrl.studyHelper.outputs[x].color='#' + color;
			}
		}
		for (var y=0; y < ctrl.studyHelper.parameters.length; y++) {
			if (ctrl.studyHelper.parameters[y].name==params.params.name) {
				ctrl.studyHelper.parameters[y].color='#' + color;
			}
		}
	};

	ctrl.closeMe=function(){
		ctrl.launchDialog=false;
	};

	ctrl.updateStudy=function(inputs, outputs, params){
		var currentInputs={};
		var currentOutputs={};
		var currentParams={};
		for(var i=0; i<inputs.length; i++){
			currentInputs[inputs[i].name]=inputs[i].value;
		}
		for(var x=0; x<outputs.length; x++){
			currentOutputs[outputs[x].name]=outputs[x].color;
		}
		for(var y=0; y<params.length; y++){
			currentParams[params[y].name+'Value']=params[y].value;
			currentParams[params[y].name+'Color']=params[y].color;
		}
		
		ctrl.studyHelper.updateStudy({inputs:currentInputs, outputs:currentOutputs, parameters:currentParams});
	};

	ctrl.launchColorpicker=function(setting,event){
		ctrl.activeOutput['div']=event.target;
		$rootScope.$broadcast('launchColorPicker', {
			component: this,
			swatch: event.target,
			params: setting
		});
	};
}

angular.module('cqNgApp').component('studyDialog', {
	controller:StudyDialog,
	templateUrl: 'templates/study-dialog.html',
	controllerAs:'studyDialog'
});