class RarbgAssistant {
  constructor() {
    this.requestCatcher = new XMLHttpRequestCatcher();
    this.trailersPage = new TrailersPage();
  }

  initalize() {
    this.requestCatcher.register("/ajax.php?mode=trailers&mode2=list", this.trailersPage);
  }
}