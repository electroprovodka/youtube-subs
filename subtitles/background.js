chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(tab.url.indexOf('youtube.com/watch') !== -1 && changeInfo.status === 'complete'){
    chrome.pageAction.show(tabId)
    // TODO: check error
    var params = tab.url.split('?')[1];
    console.log(params);
    var splitParams = params.split('&'), videoId;
    for(var i = 0; i < splitParams.length; i++){
      if(splitParams[i].indexOf('v=') === 0){
        videoId = splitParams[i].slice(2);
      }
    }
    if (videoId) {
      var x = new XMLHttpRequest();
      x.open('GET', 'http://127.0.0.1:8000/check_id/?id='+videoId)
      x.onload = function() {
        var data = JSON.parse(this.responseText);
        if(data['exist'] === false){
          chrome.tabs.sendMessage(tabId, {"message": "video_id_to_fetch"});
        }
        else if(data['exist'] === true) {
          // TODO: change icon color
          console.log('exists');
        }
        else{
          console.log(this.responseText);
        }
      }
      x.onerror = function() {
        console.log('Error');
      }
      x.send()
    }
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "subs_fetched"){
      var subs = request.subs;

      var x = new XMLHttpRequest();
      x.open('POST', 'http://127.0.0.1:8000/post/');
      x.setRequestHeader("Content-Type", "application/json");

      x.onload = function() {
        console.log('done');
      };
      x.onerror = function() {
        console.log('error');

      };

      x.send(JSON.stringify({"subs": subs}));
    }
  }
);
