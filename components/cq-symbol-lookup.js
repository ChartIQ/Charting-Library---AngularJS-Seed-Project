function cqSymbolLookup($element,UIContextFactory){
    var ctrl=this;
	ctrl.$postLink=function(){
        UIContextFactory.getContext().then(function(context){
            context.lookupDriver=new CIQ.UI.Lookup.Driver.ChartIQ();		
            context.UISymbolLookup=$(".ciq-search cq-lookup")[0];
            var KeystrokeHub=new CIQ.UI.KeystrokeHub($("body"), context, {cb:CIQ.UI.KeystrokeHub.defaultHotKeys});
            var stxx=context.stx;
            context.UISymbolLookup.setCallback(function(context, data){
                data.symbol=data.symbol.toUpperCase();
                stxx.newChart(data);
            });
            ctrl.UIContext=context;
        });
    }
}

angular.module('cqNgApp').component('cqSymbolLookup', {
	controller: cqSymbolLookup,
	templateUrl: 'templates/cq-symbol-lookup.html',
	controllerAs:'Lookup',
});