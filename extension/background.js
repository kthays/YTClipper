function isYoutubeURL(url)
{
    return url && url.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm);
}

// https://stackoverflow.com/a/40424806
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (isYoutubeURL(changeInfo.url)) {
        chrome.tabs.executeScript(null, {file: 'buttonadder.js'});
    }
});