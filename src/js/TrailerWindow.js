class TrailerWindow {
  constructor() {
    this.trailerModalNode = document.querySelector("#trailer_modal");
    this.eventSubscribers = [];
  }

  float() {
    document.body.appendChild(this.trailerModalNode);
    this.trailerModalNode.classList.add("trailer-modal");
  }

  close() {
    $(this.trailerModalNode).jqmHide();
    this.trailerModalNode.innerHTML = "";
  }
}
