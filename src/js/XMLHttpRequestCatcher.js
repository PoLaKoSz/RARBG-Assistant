class XMLHttpRequestCatcher {
  constructor() {
    const proxied = window.XMLHttpRequest.prototype.send;
    const requestCatcher = this;
    window.XMLHttpRequest.prototype.send = function() {
      const request = this;
      const intervalId = window.setInterval(function() {
        if(request.readyState != 4) {
          return;
        }

        requestCatcher.invokeActionIfExists(request);
        clearInterval(intervalId);
      }, 1);
      return proxied.apply(this, [].slice.call(arguments));
    };
    this.lookupTable = {};
  }

  register(url, action) {
    url = new URL(`https://rarbg.to${url}`);
    this.lookupTable[url] = action;
  }

  invokeActionIfExists(request) {
    // sometimes responseURL is empty
    if (!request.responseURL) {
      return;
    }

    const requestURL = new URL(request.responseURL);
    Object.keys(this.lookupTable).forEach(key => {
      const registeredURL = new URL(key);
      if (registeredURL.pathname !== requestURL.pathname) {
        return;
      }

      const registeredSearchParams = Array.from(registeredURL.searchParams.keys());
      const requestSearchParams = Array.from(requestURL.searchParams.keys());
      if (registeredSearchParams.length > requestSearchParams.length) {
        return;
      }

      let matchCount = 0;
      registeredSearchParams.forEach(registeredSearchParam => {
        matchCount += registeredURL.searchParams.get(registeredSearchParam) === requestURL.searchParams.get(registeredSearchParam);
      });
      if (matchCount != registeredSearchParams.length) {
        return;
      }

      this.lookupTable[key].invoke(request.responseText);
    });
  }
}
