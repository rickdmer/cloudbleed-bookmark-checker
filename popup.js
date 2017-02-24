document.addEventListener('DOMContentLoaded', function () {
	// cf list
	$.get('sorted_unique_cf.txt', function(returnedData) {

		var bookmarkTreeNodes = chrome.bookmarks.getTree(function(results) {
			var bookmarks = [];
			function getBookmarks(results) {
				for (var i = 0; i < results.length; i++) {
					// if the result has a url and it doesnt already exist in the array, add it.
					if (results[i].url) {
						bookmarks.push(extractDomain(results[i].url));
					}
					if (results[i].children) {
						getBookmarks(results[i].children);
					}
				}
			}
			getBookmarks(results);
			var affected = [];
			for (var i = 0; i < bookmarks.length; i++) {
				if (returnedData.indexOf('\n' + bookmarks[i] + '\n') >= 0) {
					if (affected.indexOf(bookmarks[i]) === -1) {
						affected.push(bookmarks[i]);
					}
				}
			}
			for (var j = 0; j < affected.length; j++) {
				$('#bookmarks').append('<li><a href="http://' + affected[j] + '" target="_blank">'+affected[j]+'</a></li');
			}
			$('.loading').hide();
			$('.results').show();
		});

	}, 'text');
});

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