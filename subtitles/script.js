(() => {
  const customEvent = 'dataTransmitEvent';

  const sendSubs = (subs) => {
    console.log('Dispatched');
    document.dispatchEvent(new CustomEvent(customEvent, {detail: subs}));
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
    sendSubs(xhr.responseText);
  };

  spyOnHttp(catchSubs);
  console.log('Injected');
})();
