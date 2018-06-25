const buildPath = (path) => 'http://127.0.0.1:81/api/' + path;

const getVideoId = (tabUrl) => {
  // Extract video id form query string
  if (!tabUrl){
    return null;
  }
  const url = new URL(tabUrl);
  return url.searchParams.get('v');
};

const processResponse = videoId => data => {
  if(data['exist'] === false){
    console.log('not exists')
  }
  else {
    console.log('exists');
    // chrome.browserAction.setIcon({path: 'catcher_green.png'});
  }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if page loaded + it is on youtube video
  if(changeInfo.status === 'complete' && tab.url && tab.url.indexOf('youtube.com') !== -1){
    chrome.pageAction.show(tabId)
    // TODO: check error
    const videoId = getVideoId(tab.url);
    if (videoId) {
      fetch(buildPath(`video/${videoId}/check/`)).then(r => r.json()).then(processResponse(tabId))
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
      }).then(r => console.log('done'), error => console.log('error: '+error))
    }
  }
);

console.log('backgroung');
