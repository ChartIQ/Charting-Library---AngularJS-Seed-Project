function StudyDialog($scope, $rootScope) {
	var ctrl = this;
	ctrl.launchDialog=false;
	ctrl.studyHelper={};
	ctrl.activeOutput={};

	ctrl.$postLink=function(){
		$rootScope.$on('showStudyDialog', function(event, study, ciq){
			ctrl.studyHelper=new CIQ.Studies.DialogHelper({name:study,stx:ciq});
			console.log(ctrl.studyHelper);
			$scope.inputs=ctrl.studyHelper.inputs;
			$scope.outputs=ctrl.studyHelper.outputs;
			$scope.parameters=ctrl.studyHelper.parameters;
			$scope.studyId=ctrl.studyHelper.name;
			$scope.studyName=ctrl.studyHelper.title;
			ctrl.addStudy(ctrl.studyHelper, ciq);
			ctrl.launchDialog=true;
		});
		$rootScope.$on('setColorFromPicker', function(event, params){
			if(ctrl.activeOutput.div==params.source) {
				ctrl.updateStudyHelper(params.color, params.params);
				console.log(params);
				ctrl.activeOutput.div.style.backgroundColor=CIQ.hexToRgba('#'+params.color);
			}
		});
	};

	ctrl.stringify=function(nonString){
		return nonString.toString();
	};

	ctrl.updateStudyHelper=function(color, params){
		console.log(color, params);
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

	ctrl.addStudy=function(params, ciq){
		CIQ.Studies.addStudy(ciq,
			params.name,
			params.libraryEntry.inputs,
			params.libraryEntry.outputs,
			params.libraryEntry.parameters);
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