const buildPath = (path) => 'http://127.0.0.1:8000/api/' + path;

const getVideoId = (tabUrl) => {
  // Extract video id form query string
  if (!tabUrl){
    return null;
  }
  const url = new URL(tabUrl);
  return url.searchParams.get('v');
};

const processResponse = tabId => data => {
  if(data['exist'] === false){
    chrome.tabs.sendMessage(tabId, {"message": "videoIdToFetch"});
  }
  else {
    // TODO: change icon color
    console.log('exists');
  }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if page loaded + it is on youtube video
  if(changeInfo.status === 'complete' && tab.url && tab.url.indexOf('youtube.com/watch') !== -1){
    chrome.pageAction.show(tabId)
    // TODO: check error
    const videoId = getVideoId(tab.url);
    if (videoId) {
      fetch(buildPath('video/' + videoId + '/check/')).then(r => r.json()).then(processResponse(tabId))
      console.log('request');

    }
  }
});

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if(request.message === "subsFetched"){
      const videoId = getVideoId(sender.tab.url);
      const subs = request.subs;
      const title = request.title;
      const descr = request.description;
      fetch(buildPath('video/'), {
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify({
          "text": subs,
          "youtubeId": videoId,
          "title": title,
          "description": descr})
      }).then(r => console.log('done'), error => console.log('error'))
    }
  }
);

console.log('backgroung');
