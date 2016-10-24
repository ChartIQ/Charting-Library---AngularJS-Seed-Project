function StudyDialog($scope, $rootScope) {
	var ctrl = this;
	ctrl.launchDialog=false;
	ctrl.studyHelper={};
	ctrl.activeOutput={};

	ctrl.$postLink=function(){
		$rootScope.$on('showStudyDialog', function(event, study, ciq){
			ctrl.studyHelper=new CIQ.Studies.DialogHelper({name:study,stx:ciq});
			//these are what the html uses
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
				ctrl.updateStudyHelper(color);
				ctrl.activeOutput.div.style.backgroundColor = '#' + color;
			}
		});
	};//end $postLink
	ctrl.updateStudyHelper=function(color){
		for (var x = 0; x < ctrl.studyHelper.outputs.length; x++) {
			if (ctrl.studyHelper.outputs[x].name == ctrl.activeOutput.name) {
				ctrl.studyHelper.outputs[x].color = '#' + color;
			}
		}
		for (var y = 0; y < ctrl.studyHelper.parameters.length; y++) {
			if (ctrl.studyHelper.parameters[y].name == ctrl.activeOutput.name) {
				ctrl.studyHelper.parameters[y].color = '#' + color;
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
		var inputChanges={};
		var outputChanges={};
		var paramChanges={};
		for(var i=0; i<inputs.length; i++){
			inputChanges[inputs[i].name]=inputs[i].value;
		}
		for(var x=0; x<outputs.length; x++){
			outputChanges[outputs[x].name]=outputs[x].color;
		}
		for(var y=0; y<params.length; y++){
			paramChanges[params[y].name+'Value']=params[y].value;
			paramChanges[params[y].name+'Color']=params[y].color;
		}
		ctrl.studyHelper.updateStudy({inputs:inputChanges, outputs:outputChanges, parameters:paramChanges});
	};
	ctrl.launchColorpicker=function(output, div){
		ctrl.activeOutput['div']=div;
		ctrl.activeOutput['name']=output.name;
		$rootScope.$broadcast('launchColorPicker', {
			component: this,
			swatch: div,
			params: output
		});
	};
}

angular.module('cqNgApp').component('studyDialog', {
	controller:StudyDialog,
	templateUrl: 'templates/study-dialog.html',
	controllerAs:'studyDialog'
});