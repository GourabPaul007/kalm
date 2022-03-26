document.getElementById("sidebarOpenbtn").onclick = function () {
  new SidebarNavigation().openSidebar();
};

// hide sidebar on any click outside of it
window.onload = function () {
  document.onclick = function (e) {
    new SidebarNavigation().closeSidebar(e);
  };
};

document.getElementById("addLinkIconButton").onclick = function () {
  new SidebarFunctionality().onPressAddLink();
};
document.getElementById("cancelLinkCreationButton").onclick = function () {
  new SidebarFunctionality().onPressGoBack();
};

document.getElementById("saveLinkButton").onclick = function () {
  new SidebarFunctionality().addLink();
};

document.getElementById("sidebar").onclick = function (e) {
  let el;
  if (e.target.classList.contains("linkMoreOptions")) {
    el = e.target.parentElement;
  } else if (e.target.classList.contains("moreOptionsIcon")) {
    el = e.target.parentElement.parentElement;
  }
  new SidebarFunctionality().onPressDelete(el);
};

class SidebarNavigation {
  openSidebar() {
    if (document.getElementById("sidebar").style.display === "flex") {
      document.getElementById("sidebar").style.display = "none";
    } else {
      document.getElementById("sidebar").style.display = "flex";
    }
  }

  closeSidebar(e) {
    let divToHide = document.getElementById("sidebar");
    if (!divToHide.contains(e.target) && e.target.id !== "sidebarOpenbtn") {
      divToHide.style.display = "none";
    }
  }

  // function openNav() {
  //   document.getElementById("sidebarOpenbtn").style.display = "none";
  //   document.getElementsByClassName("sidebar")[0].style.width = sidebarWidth;
  //   chrome.storage.sync.set({ showSidebar: true });
  // }

  // closeNav() {
  //   document.getElementById("sidebarOpenbtn").style.display = "block";
  //   document.getElementsByClassName("sidebar")[0].style.width = "0px";
  //   chrome.storage.sync.set({ showSidebar: false });
  // }
}

class SidebarFunctionality {
  onPressAddLink() {
    document.getElementById("linksDiv").style.display = "none";
    document.getElementById("addLinkModal").style.display = "flex";
    document.getElementById("sidebar").classList.add("next");
  }

  onPressGoBack() {
    document.getElementById("linksDiv").style.display = "flex";
    document.getElementById("addLinkModal").style.display = "none";
    document.getElementById("sidebar").classList.remove("next");
  }

  /**
   *  Update Links on addLink button click in sidebar
   * */
  addLink() {
    let linkTitleInput = document.getElementById("linkTitleInput").value;
    let linkLinksInput = document.getElementById("linkLinksInput").value;
    chrome.storage.local.get({ links: [] }, function (result) {
      let links = result.links;
      if (
        (linkTitleInput == null || linkTitleInput == "") &&
        (linkLinksInput == [null] || linkLinksInput == [""])
      )
        return;

      links.push({
        linkTitle: linkTitleInput,
        linkLinks: [linkLinksInput],
        elementId: Date.now().toString(),
      });
      chrome.storage.local.set({ links: links }, function () {
        initLinks();
      });
    });
  }
  /**
   * @param {String} linkTitleInput
   * @param {String} linkLinksInput
   * @returns {Boolean}
   * returns true or false after sanitizing inputs from addLinks modal
   * returns true ONLY if the parameters are sanitized
   */
  sanitizeInputs(linkTitleInput, linkLinksInput) {
    if (
      (linkTitleInput == null || linkTitleInput == "") &&
      (linkLinksInput == [null] || linkLinksInput == [""])
    ) {
      return false;
    } else {
      return true;
    }
  }

  onPressDelete(el) {
    chrome.storage.local.get({ links: [] }, function (result) {
      let links = result.links;
      for (let i = 0; i < links.length; i++) {
        if (links[i].elementId === el.id) {
          // links.remove(links[i]);
          links.splice(links.indexOf(links[i]), 1);
        }
      }
      chrome.storage.local.set({ links: links }, function () {
        initLinks();
      });
    });
  }
}
