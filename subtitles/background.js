function buildPath(path) {
  return 'http://127.0.0.1:8000/api/'+path
}

function getVideoId(tabUrl) {
  if (!tabUrl){
    return null;
  }
  var params = tabUrl.split('?')[1];
  console.log(params);
  var splitParams = params.split('&'), videoId;
  for(var i = 0; i < splitParams.length; i++){
    if(splitParams[i].indexOf('v=') === 0){
      return splitParams[i].slice(2);
    }
  }
}

function createRequest(method, url, onload, onerror) {
  var x = new XMLHttpRequest();
  x.open(method, url)
  x.onload = onload;
  x.onerror = onerror;
  return x
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(changeInfo.status === 'complete' && tab.url && tab.url.indexOf('youtube.com/watch') !== -1){
    chrome.pageAction.show(tabId)
    // TODO: check error
    var videoId = getVideoId(tab.url);
    if (videoId) {
      var x = createRequest(
        'GET',
        buildPath('check_id/?id='+videoId),
        function() {
          var data = JSON.parse(this.responseText);
          if(data.data['exist'] === false){
            chrome.tabs.sendMessage(tabId, {"message": "video_id_to_fetch"});
          }
          else if(data.data['exist'] === true) {
            // TODO: change icon color
            console.log('exists');
          }
          else{
            console.log(this.responseText);
          }
        },
        function() {
          console.log('Error');
        }
      )
      x.send()
    }
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "subs_fetched"){
      var videoId = getVideoId(sender.tab.url);
      var subs = request.subs, title = request.title,
        descr = request.description;
      var x = createRequest(
        'POST',
        buildPath('post/'),
        function() {
          console.log('done');
        },
        function() {
          console.log('error');
        }
      );
      x.setRequestHeader("Content-Type", "application/json");
      x.send(JSON.stringify({
        "text": subs,
        "video_id": videoId,
        "title": title,
        "description": descr})
      );
    }
  }
);
