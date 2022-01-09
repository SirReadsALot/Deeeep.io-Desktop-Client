let active = false

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        const url = new URL(changeInfo.url);
        if (url.searchParams.get("swapper") == "true") {
            active = true
        } else {
            active = false
        }
    }
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // var assetUrl = options.redirectAssets ? clam1 : details.url; 

        return {redirectUrl: ""};
    },
    // {
    //     urls: [
    //         "https://beta.deeeep.io/*"
    //     ],
    //     types: ["script"]
    // },
    ["blocking"]
);