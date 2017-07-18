(function () {
  var injected = false;
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log('message callback')
      if( request.message === 'videoIdToFetch' && !injected) {
        injected = true;
        var s = document.createElement('script');
        s.src = chrome.extension.getURL('script.js');
        (document.head || document.documentElement).appendChild(s);

        document.addEventListener('dataTransmitEvent', function() {
          var title = document.getElementById('eow-title').textContent;
          var description = document.getElementById('watch-description-text').textContent;
          var subs = localStorage.getItem('YOUTUBE_SUBTITLES');
          chrome.runtime.sendMessage({
            "message": "subsFetched",
            "subs": subs,
            "title": title,
            "description": description
          });
        });
      }
    }
  );
})()
