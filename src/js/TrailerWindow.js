class TrailerWindow {
  constructor() {
    this.trailerModalNode = document.querySelector("#trailer_modal");
    this.openEventSubscribers = [];
    this.closeEventSubscribers = [];
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
    this.openEventSubscribers = actions;
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
    const eventSubscribers = this.openEventSubscribers;
    jQuery.fn.jqm = function() {
      arguments[0]['onLoad'] = function() {
        eventSubscribers.forEach(subscriber => {
          subscriber.method(subscriber.instance);
        });
      }

      return proxied.apply(this, arguments);
    };
  }

  fixOverlayForAdblockers() {
    const overlayNode = document.querySelector(".jqmOverlay");
    overlayNode.classList.remove("jqmOverlay");
    overlayNode.style.backgroundColor = "#000";
  }

  hideScrollbar() {
    const originalWidth = document.body.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.width = `${originalWidth}px`;
  }

  showScrollbar() {
    document.body.style.overflow = "visible";
    document.body.style.width = "auto";
  }

  onClose(actions) {
    this.closeEventSubscribers = actions;
    this.attachEventToWindowClose();
  }
  
  attachEventToWindowClose() {
    const eventSubscribers = this.closeEventSubscribers;
    const proxied = window.closejqm;
    window.closejqm = function() {
      eventSubscribers.forEach(subscriber => {
        subscriber.method(subscriber.instance);
      });

      return proxied.apply(this, arguments);
    };
  }
}
