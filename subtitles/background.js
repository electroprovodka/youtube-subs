chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(tab.url.indexOf('youtube.com/watch') !== -1){
    chrome.pageAction.show(tabId)
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "subs_fetched"){
      var subs = request.subs;
      
      var x = new XMLHttpRequest()
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
