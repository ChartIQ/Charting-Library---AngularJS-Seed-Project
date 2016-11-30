angular.module('cqNgApp').factory('UIContextFactory', function($rootScope){
	this.context=null;
	return {
		create: function(stxx){
			var context=new CIQ.UI.Context(stxx, $("*[cq-context]"));			
			context.startMenuProcessing();
			this.context=context;		
			$rootScope.$broadcast('contextReady');
		},
		getContext:function(){
			var self=this;
			return new Promise(
				function(resolve, reject){
					if(self.context){
						resolve(self.context);
					} else {
						$rootScope.$on('contextReady', function(){
							resolve(self.context);
						});
					} 
				}
			);
		}
	}
});