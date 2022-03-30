// When you click the linksModalOpenBtn, open the Links Modal
document.getElementById("linksModalOpenBtn").onclick = function () {
  new LinksModalNavigation().openLinksModal();
};

// When user clciks anything other than linksModal, close it
document.body.onclick = function (e) {
  new LinksModalNavigation().closeLinksModal(e);
};

// Get user to add link modal on click of addLinkIconButton
document.getElementById("addLinkIconButton").onclick = function () {
  new LinksModalFunctionality().onPressAddLink();
};

// Go back to links modal on cancelLinkCreationButton click
document.getElementById("cancelLinkCreationButton").onclick = function () {
  new LinksModalFunctionality().onPressGoBack();
};

// When you click the save link button, save the link and go back to links modal
document.getElementById("saveLinkButton").onclick = function () {
  new LinksModalFunctionality().addLink();
};

document.getElementById("linksModal").onclick = function (e) {
  let moreOptionsDialog = document.getElementById("moreOptionsDialog");
  if (e.target.classList.contains("linkMoreOptions")) {
    let el = e.target.parentElement;
    moreOptionsDialog.classList.toggle("show");
    moreOptionsDialog.style.top = `${e.clientY - 20}px`;
    moreOptionsDialog.style.left = `${e.clientX - 80}px`;
    // moreOptionsDialog.style.left = e.target.posX;
    document.getElementById("deleteLinkButton").onclick = () => {
      new LinksModalFunctionality().onPressDelete(el);
    };
    // new LinksModalFunctionality().onPressDelete(el);
  } else if (e.target.classList.contains("moreOptionsIcon")) {
    let el = e.target.parentElement.parentElement;
    moreOptionsDialog.classList.toggle("show");
    moreOptionsDialog.style.top = `${e.clientY - 20}px`;
    moreOptionsDialog.style.left = `${e.clientX - 80}px`;
    document.getElementById("deleteLinkButton").onclick = () => {
      new LinksModalFunctionality().onPressDelete(el);
    };
    // new LinksModalFunctionality().onPressDelete(el);
  }
};

class LinksModalNavigation {
  openLinksModal() {
    let linksModal = document.getElementById("linksModal");
    if (linksModal.style.display === "flex") {
      linksModal.style.display = "none";
    } else {
      linksModal.style.display = "flex";
    }
  }

  closeLinksModal(e) {
    let linksModal = document.getElementById("linksModal");
    if (!linksModal.contains(e.target) && e.target.id !== "linksModalOpenBtn") {
      linksModal.style.display = "none";
    }
  }

  // function openNav() {
  //   document.getElementById("sidebarOpenbtn").style.display = "none";
  //   document.getElementsByClassName("sidebar")[0].style.width = sidebarWidth;
  //   chrome.storage.sync.set({ showLinksModal: true });
  // }

  // closeNav() {
  //   document.getElementById("sidebarOpenbtn").style.display = "block";
  //   document.getElementsByClassName("sidebar")[0].style.width = "0px";
  //   chrome.storage.sync.set({ showLinksModal: false });
  // }
}

class LinksModalFunctionality {
  onPressAddLink() {
    document.getElementById("linksDiv").style.display = "none";
    document.getElementById("addLinkModal").style.display = "flex";
    document.getElementById("linksModal").classList.add("next");
  }
  onPressGoBack() {
    document.getElementById("linksDiv").style.display = "flex";
    document.getElementById("addLinkModal").style.display = "none";
    document.getElementById("linksModal").classList.remove("next");
  }
  /**
   *  Update Links on addLink button click in linksModal
   * */
  addLink() {
    let linkTitleInput = document.getElementById("linkTitleInput").value;
    let linkLinksInput = document.getElementById("linkLinksInput").value;
    chrome.storage.sync.get({ links: [] }, function (result) {
      let links = result.links;
      if (linkTitleInput == "" && linkLinksInput == [""]) return;
      links.push({
        linkTitle: linkTitleInput,
        linkLinks: [linkLinksInput],
        elementId: Date.now().toString(),
      });
      chrome.storage.sync.set({ links: links }, function () {
        initLinks();
      });
      // Go back after saving the link
      new LinksModalFunctionality().onPressGoBack();
    });
  }
  /**
   * @param {String} linkTitleInput
   * @param {String} linkLinksInput
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
    chrome.storage.sync.get({ links: [] }, function (result) {
      let links = result.links;
      for (let i = 0; i < links.length; i++) {
        if (links[i].elementId === el.id) {
          // links.remove(links[i]);
          links.splice(links.indexOf(links[i]), 1);
        }
      }
      chrome.storage.sync.set({ links: links }, function () {
        initLinks();
      });
    });
  }
}
