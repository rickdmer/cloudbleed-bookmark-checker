/**
 * Function from: http://stackoverflow.com/questions/8498592/extract-root-domain-name-from-string
 */
function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf('://') > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

document.addEventListener('DOMContentLoaded', function () {
	// cf list
	$.get('sorted_unique_cf.txt', function(returnedData) {

	    var bookmarkTreeNodes = chrome.bookmarks.getTree(function(results) {
	    	var bookmarks = [];
	    	function getBookmarks(results) {
	    		for (var i = 0; i < results.length; i++) {
		    		if (results[i].url) {
		    			bookmarks.push(extractDomain(results[i].url));
		    		}
		    		if (results[i].children) {
		    			getBookmarks(results[i].children)
		    		}
	    		}
	    	}
	    	getBookmarks(results);
	    	for (var i = 0; i < bookmarks.length; i++) {
		    	if (returnedData.indexOf('\n' + bookmarks[i] + '\n') >= 0) {
		    		$('#bookmarks').append('<li><a href="http://' + bookmarks[i] + '">'+bookmarks[i]+'</a></li');
		    	}
		    }
		    $('.loading').hide();
		    $('.results').show();
	    });

	}, 'text');
});