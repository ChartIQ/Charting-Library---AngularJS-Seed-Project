function cqChartTitle($element,UIContextFactory){
    var ctrl=this;
	ctrl.$postLink=function(){
        UIContextFactory.getContext().then(function(context){
            //do stuff if you dare...but you don't need to.
        });
    }
}

angular.module('cqNgApp').component('cqChartTitle', {
	controller: cqChartTitle,
	templateUrl: 'templates/cq-chart-title.html',
	controllerAs:'ChartTitle',
});