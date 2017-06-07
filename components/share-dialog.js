function ShareDialog($rootScope) {
	var ctrl = this;
	ctrl.launchDialog=false;
	ctrl.ciq=null;

	ctrl.$postLink=function(){
		console.log(CIQ);
		$rootScope.$on('showShareDialog', function(event, params){
			ctrl.ciq=params;
			ctrl.showDialog();
		});
		CIQ.Share.createAlternateImage=function(ciq,cb) {
			var image=document.createElement("img");
			image.src=ciq.chart.canvas.toDataURL("image/png");
			var canvas=document.createElement("canvas");
			var context=canvas.getContext("2d");
			context.drawImage(image, 0, 0, ciq.chart.canvas.width, ciq.chart.canvas.height);
			return cb(null,canvas);
		};
	};

	ctrl.showDialog=function(){
		ctrl.launchDialog=true;
	};

	ctrl.closeMe=function(){
		ctrl.launchDialog=false;
	};

	ctrl.renderShareLink=function(){
		CIQ.Share.createAlternateImage(ctrl.ciq, function(err, canvas){
			console.log(canvas);
			CIQ.localStorage.setItem("manualImg",canvas.toDataURL("image/jpeg"));
		});
	};
}

angular.module('cqNgApp').component('shareDialog', {
	controller:ShareDialog,
	templateUrl: 'templates/share-dialog.html',
	controllerAs:'shareDialog'
});
