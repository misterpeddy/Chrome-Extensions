chrome.commands.onCommand.addListener(function() {
	
	chrome.tabs.query({active: true}, function(tabs) {
		url = tabs[0].url;
		newUrl = getNewUrl(url);
		if (newUrl) {
			chrome.tabs.update(tabs[0].id, {url: newUrl});
		}
	});
});

function getNewUrl(url) {
//Look for $[.*]/page/[.*
page = url.substring(url.lastIndexOf("/page/")+6);
if (!isNaN(parseInt(page))) {
	return url.substring(0 , url.lastIndexOf("/page/")+6) + (parseInt(page) + 1);
}
//Construct a pattern

//finish with a slash
if (url.charAt(url.length -1 ) != "/") {
	url = url + "/";
}
url = url + "page/2";
return url;

}
