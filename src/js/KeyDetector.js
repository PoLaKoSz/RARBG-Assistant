class KeyDetector {
  isEscPressed(event) {
    event = event || window.event;
    if ("key" in event) {
        return event.key === "Escape" || event.key === "Esc";
    }

    return event.keyCode === 27;
  }
}
