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

  onOpen(actions) {
    this.eventSubscribers = actions;
    this.attachEventToWindowOpen();
  }

  addSearchButton(self) {
    const titleContainerNode = self.trailerModalNode.querySelector("table:nth-child(3) > tbody > tr > td:nth-child(1)");
    const titleNode = titleContainerNode.querySelector("b");
    const button = `
      <span>
        <a href="https://rarbg.to/torrents.php?search=${titleNode.innerText}" target="_blank">
          <i class="icon-search"></i>
          Search for ${titleNode.innerText}
        </a>
      </span>
      `;
    titleContainerNode.innerHTML += button;
  }

  attachEventToWindowOpen() {
    const proxied = jQuery.fn.jqm;
    const eventSubscribers = this.eventSubscribers;
    jQuery.fn.jqm = function() {
      arguments[0]['onLoad'] = function() {
        eventSubscribers.forEach(subscriber => {
          subscriber.method(subscriber.instance);
        });
      }

      return proxied.apply(this, arguments);
    };
  }
}
