class RarbgAssistant {
  constructor() {
    this.requestCatcher = new XMLHttpRequestCatcher();
    this.trailersPage = new TrailersPage();
  }

  initalize() {
    this.requestCatcher.register("/ajax.php?mode=trailers&mode2=list", this.trailersPage);

    document.addEventListener('DOMContentLoaded', function() {
      const trailerWindow = new TrailerWindow();
      trailerWindow.float();
      trailerWindow.onOpen([
        {
          instance: trailerWindow,
          method: trailerWindow.addSearchButton,
        },
        {
          instance: trailerWindow,
          method: trailerWindow.fixOverlayForAdblockers,
        }
      ]);

      document.onkeydown = function(event) {
        const keyDetector = new KeyDetector();
        if (keyDetector.isEscPressed(event)) {
          trailerWindow.close();
        }
      };
    });
  }
}
