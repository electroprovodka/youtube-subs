(function () {
  var injected = false;
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === 'video_id_to_fetch' && !injected) {
        injected = true;
        var s = document.createElement('script');
        s.src = chrome.extension.getURL('script.js');
        (document.head || document.documentElement).appendChild(s);

        document.addEventListener('dataTransmitEvent', function() {
          var title = document.getElementById('eow-title').textContent;
          var subs = localStorage.getItem('YOUTUBE_SUBTITLES');
          chrome.runtime.sendMessage({
            "message": "subs_fetched",
            "subs": subs,
            "title": title});
        });
      }
    }
  );
})()
