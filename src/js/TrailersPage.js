class TrailersPage {
  invoke(payload) {
    const trailerIds = payload.match(/(?<=id="trailer_)(\d+)/g);
    if (!trailerIds) {
      const message = 'Couldn\'t find any trailer Id!';
      console.log(message, { payload: payload });
      throw message;
    }

    trailerIds.forEach(id => {
      let trailerContainerNode = document.querySelector(`#trailer_${id}`);
      const anchors = trailerContainerNode.querySelectorAll("a");
      anchors.forEach(anchor => {
        let proxiedClick = anchor.onclick;
        anchor.onclick = function() {
          proxiedClick();
          return false;
        }
      })
    });
  }
}
