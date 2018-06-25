(() => {
  console.log('Injection');
  const s = document.createElement('script');
  s.src = chrome.extension.getURL('script.js');
  s.onload = () => { s.remove(); }
  (document.head || document.documentElement).appendChild(s);

  document.addEventListener('dataTransmitEvent', (e) => {
    console.log('Receive back')
    const title = document.querySelectorAll('.title .ytd-video-primary-info-renderer')[0].textContent;
    const description = document.getElementById('description').textContent;
    chrome.runtime.sendMessage({
      "message": "subsFetched",
      "subs": e.detail,
      "title": title,
      "description": description
    });
  });
})()
