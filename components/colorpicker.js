function ColorPicker($element,$rootScope,$scope) {
	var ctrl = this;
	ctrl.posLeft=0;
	ctrl.posTop=0;
	ctrl.caller=false;
	ctrl.launch="none";

	ctrl.$postLink=function () {
		$rootScope.$on('launchColorPicker', function(event, params){
			console.log(params);
			CIQ.createColorPicker($element[0].children.colorPicker.children[0], ctrl.setColor(params));
			var clicked=params.swatch;
			var colorPickerDiv=$element[0].children.colorPicker.children[0];
			var container=clicked.parentElement;

			var xy=CIQ.getPos(clicked);
			var x2y2=CIQ.getPos(container);
			xy.x=xy.x-x2y2.x;
			xy.y=xy.y-x2y2.y;

			var x=xy.x+clicked.clientWidth;
			if((x+colorPickerDiv.offsetWidth)>container.clientWidth)
				x-=(x+colorPickerDiv.offsetWidth)-container.clientWidth+20;
			ctrl.posLeft=x+"px";

			var y=(xy.y);
			if(y+colorPickerDiv.clientHeight>container.clientHeight)
				y-=(y+colorPickerDiv.clientHeight)-container.clientHeight-150;
			ctrl.posTop=y+"px";

			ctrl.caller=clicked;
			ctrl.launch="block";
		});
	};

	ctrl.setColor=function(params){
		return function() {
			ctrl.closeMe();
			$rootScope.$broadcast('setColorFromPicker', {color:arguments, source:ctrl.caller, params:params});
			console.log(ctrl.launch); //ugh whyyyy
		}
	};

	ctrl.closeMe=function(){
		ctrl.launch="none";
		ctrl.posLeft=0;
		ctrl.posTop=0;
	};
}

angular.module('cqNgApp').component('colorPicker', {
	controller:ColorPicker,
	templateUrl: 'templates/colorpicker.html',
	controllerAs:'colorPicker',
});