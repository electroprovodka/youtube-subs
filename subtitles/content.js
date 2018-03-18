(() => {
  console.log('Injection');
  const s = document.createElement('script');
  s.src = chrome.extension.getURL('script.js');
  (document.head || document.documentElement).appendChild(s);
  document.addEventListener('dataTransmitEvent', () => {
    console.log('Receive back')
    const title = document.querySelectorAll('.title .ytd-video-primary-info-renderer')[0].textContent;
    const description = document.getElementById('description').textContent;
    const subs = localStorage.getItem('YOUTUBE_SUBTITLES');
    localStorage.removeItem('YOUTUBE_SUBTITLES');
    chrome.runtime.sendMessage({
      "message": "subsFetched",
      "subs": subs,
      "title": title,
      "description": description
    });
  });
})()
