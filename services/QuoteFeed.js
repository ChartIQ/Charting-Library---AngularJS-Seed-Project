angular.module('cqNgApp').service('quoteFeed', function() {

	this.makeFeed=function(whichFeed){
		return new CIQ.QuoteFeed[whichFeed]();
	};

	// To implement your own quotefeed and see other methods of data loading, check out our tutorial: http://documentation.chartiq.com/tutorial-Data%20Loading.html
	CIQ.QuoteFeed.MyFeed=function (url) {
		this.url = url;
	};

	// Inherit from the base feed
	CIQ.QuoteFeed.MyFeed.ciqInheritsFrom(CIQ.QuoteFeed);
});