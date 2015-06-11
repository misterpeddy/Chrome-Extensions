chrome.commands.onCommand.addListener(function() {
	
	chrome.tabs.query({active: true}, function(tabs) {
		url = tabs[0].url;
		newUrl = getNewUrl(url, function(newUrl) {
			if (newUrl) {
				chrome.tabs.update(tabs[0].id, {url: newUrl});
			}
		});
	});
});

function getNewUrl(url, callback) {
//Look for $[.*]/page/[.*
page = url.substring(url.lastIndexOf("/page/")+6);
if (!isNaN(parseInt(page))) {
	callback(url.substring(0 , url.lastIndexOf("/page/")+6) + (parseInt(page) + 1));
	return;
}
else {
	//finish with a slash
	if (url.charAt(url.length -1 ) != "/") {
		url = url + "/";
	}
	url = url + "page/2";

	validate(url, function(request) {
		chrome.extension.getBackgroundPage().console.log(request);
		if (request.status == 200) {
			callback(url);
			return;
		} 
		else {
			chrome.extension.getBackgroundPage().console.log("Cannot go forward");
		}
	});
}
}

function validate(url, callback) {
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, true );
    xmlHttp.onreadystatechange = function() {
    	if (xmlHttp.readyState == 4) {
    		callback(xmlHttp);
    	}
    }
    xmlHttp.send();
}