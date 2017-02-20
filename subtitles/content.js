var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head || document.documentElement).appendChild(s);

document.addEventListener('dataTransmitEvent', function() {
  var subs = localStorage.getItem('YOUTUBE_SUBTITLES');
  chrome.runtime.sendMessage({"message": "subs_fetched", "subs": subs})
})
