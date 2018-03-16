(() => {
  const customEvent = document.createEvent('Event');
  customEvent.initEvent('dataTransmitEvent', true, true);

  const storeSubsInStorage = (subs) => {
    localStorage.setItem('YOUTUBE_SUBTITLES', subs);
    document.dispatchEvent(customEvent);
  };

  const spyOnHttp = (callback) => {
    console.log('spy');
    const send = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function(...args) {
      this.onload = () => {
        callback(this);
      };
      send.apply(this, args);
    };
  };

  const catchSubs = xhr => {
    if (xhr.responseURL.indexOf('timedtext') === -1) {
      return;
    }
    console.log('Catched');
    storeSubsInStorage(xhr.responseText);
  };

  spyOnHttp(catchSubs);
  console.log('Injected');
})();
