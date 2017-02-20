(function () {
  var customEvent = document.createEvent('Event');
  customEvent.initEvent('dataTransmitEvent', true, true);

  function storeSubsInStorage(subs){
    localStorage.setItem('YOUTUBE_SUBTITLES', subs);
    document.dispatchEvent(customEvent);
  };

  function spyOnHttp(callback) {
    console.log('spy');
    var send = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function () {
      this.onload = function () {
        callback(this);
      };
      send.apply(this, arguments);
    };
  };

  function catchSubs(xhr) {
    if (xhr.responseURL.indexOf('timedtext') === -1) {
      return;
    }
    console.log(xhr.responseURL);
    storeSubsInStorage(xhr.responseText);
  };

  spyOnHttp(catchSubs);
})();
