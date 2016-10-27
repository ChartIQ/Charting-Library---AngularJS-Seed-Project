function ColorPicker($element,$rootScope, $scope) {
	var ctrl = this;
	ctrl.posLeft=0;
	ctrl.posTop=0;
	ctrl.caller=false;
	ctrl.launch=false;

	ctrl.$postLink=function () {
		$rootScope.$on('launchColorPicker', function(event, params){
			//CIQ.UI.Prototypes.Swatch.launchColorPicker();
			//CIQ.createColorPicker($element[0].children.colorPicker.children[0], ctrl.setColor(params));
			
			createColorPicker($element[0].children.colorPicker.children[0], ctrl.setColor(params));
			var clicked=params.swatch;
			var colorPickerDiv=$element[0].children.colorPicker.children[0];
			var container=clicked.parentElement;
			
//			attachColorPicker(clicked, $element[0], function(color){
//				//CIQ.Comparison.colorSelection="#" + color;
//			});

			var xy=getPos(clicked);
			var x2y2=getPos(container);
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
			ctrl.launch=true;
		});
	};

	ctrl.setColor=function(params){
		return function() {
			$rootScope.$broadcast('setColorFromPicker', {color:arguments, source:ctrl.caller, params:params});
			ctrl.closeMe();
		};
	};

	ctrl.closeMe=function(){
		$scope.$apply(function(){
			ctrl.launch=false;
			ctrl.posLeft=0;
			ctrl.posTop=0;
		});
	};
}

var colorPickerColors = [
    "ffffff","ffd0cf","ffd9bb","fff56c","eaeba3","d3e8ae","adf3ec","ccdcfa","d9c3eb",
	"efefef","eb8b87","ffb679","ffe252","e2e485","c5e093","9de3df","b1c9f8","c5a6e1",
	"cccccc","e36460","ff9250","ffcd2b","dcdf67","b3d987","66cac4","97b8f7","b387d7",
	"9b9b9b","dd3e39","ff6a23","faaf3a","c9d641","8bc176","33b9b0","7da6f5","9f6ace",
	"656565","b82c0b","be501b","e99b54","97a030","699158","00a99d","5f7cb8","784f9a",
	"343434","892008","803512","ab611f","646c20","46603a","007e76","3e527a","503567",
	"000000","5c1506","401a08","714114","333610","222f1d","00544f","1f2a3c","281a33"
];

var createColorPicker = function (div, fc) {
	
	console.log(div);
	var colors=colorPickerColors;
	CIQ.clearNode(div);
	var ul=document.createElement("ul");
	div.appendChild(ul);
	function clkFn(c){ return function(){ fc(c); return false;};}
	for(var i=0;i<colors.length;i++){
		var c=colors[i];
		var li=document.createElement("li");
		var a=document.createElement("a");
		li.appendChild(a);
		a.href="#";
		a.title=c;
		a.style.background="#"+c;
		a.innerHTML=c;
		ul.appendChild(li);
		a.onclick=clkFn(c);
	}
};

var getPos=function(el) {
    for (var lx=0, ly=0;
         el;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
};

var attachColorPicker = function(colorClick, cpHolder, cb){
	var closure=function(colorClick, cpHolder, cb){
		return function(color){
			if(cpHolder.colorPickerDiv) cpHolder.colorPickerDiv.style.display="none";
			colorClick.style.backgroundColor="#"+color;
			if(cb) cb(color);
		};
	};
	colorClick.onclick=(function(fc, cpHolder){ return function(){
		if(!cpHolder.colorPickerDiv){
			cpHolder.colorPickerDiv=document.createElement("DIV");
			cpHolder.colorPickerDiv.className="ciqColorPicker";
			document.body.appendChild(cpHolder.colorPickerDiv);
		}
		createColorPicker(cpHolder.colorPickerDiv, fc);
		cpHolder.colorPickerDiv.style.display="block";
		var xy=getPos(this);
		var x=xy.x+this.clientWidth;
		if((x+cpHolder.colorPickerDiv.offsetWidth)>CIQ.pageWidth())
			x-=(x+cpHolder.colorPickerDiv.offsetWidth)-CIQ.pageWidth()+20;
		cpHolder.colorPickerDiv.style.left=x+"px";

		var y=(xy.y);
		if(y+cpHolder.colorPickerDiv.clientHeight>CIQ.pageHeight())
			y-=(y+cpHolder.colorPickerDiv.clientHeight)-CIQ.pageHeight();
		cpHolder.colorPickerDiv.style.top=y+"px";
	};})(closure(colorClick, cpHolder, cb), cpHolder);
};

angular.module('cqNgApp').component('colorPicker', {
	controller:ColorPicker,
	templateUrl: 'templates/colorpicker.html',
	controllerAs:'colorPicker',
});