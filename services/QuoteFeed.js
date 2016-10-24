angular.module('cqNgApp').service('quoteFeed', function() {

	this.makeFeed=function(whichFeed){
		return new CIQ.QuoteFeed[whichFeed]();
	};

	CIQ.QuoteFeed.MyFeed=function (url) {
		this.url = url;
	};

	// Inherit from the base feed
	CIQ.QuoteFeed.MyFeed.ciqInheritsFrom(CIQ.QuoteFeed);
});