// When you click the linksModalOpenBtn, open the Links Modal
$("#linksModalOpenBtn").onclick = function () {
  new LinksModalNavigation().openLinksModal();
};

// When user clciks anything other than linksModal, close it
document.body.onclick = function (e) {
  new LinksModalNavigation().closeLinksModal(e);
};

// Get user to add link modal on click of addLinkIconButton
$("#addLinkIconButton").onclick = function () {
  new LinksModalFunctionality().onPressAddLink();
};

// Go back to links modal on cancelLinkCreationButton click
$("#cancelLinkCreationButton").onclick = function () {
  new LinksModalFunctionality().onPressGoBack();
};

// When you click the save link button, save the link and go back to links modal
$("#saveLinkButton").onclick = function () {
  new LinksModalFunctionality().addLink();
};

$("#linksModal").onclick = function (e) {
  let linksModalFunctionality = new LinksModalFunctionality();
  let element;
  if (e.target.classList.contains("linkMoreOptions")) {
    element = e.target.parentElement;
  } else if (e.target.classList.contains("moreOptionsIcon")) {
    element = e.target.parentElement.parentElement;
  } else {
    return; //return if not clicked on the more options button
  }
  linksModalFunctionality.onClickMoreOptionsBtn(e);
  $("#editLinkButton").onclick = () => {
    console.log(element);
    linksModalFunctionality.onPressEditButton(element);
  };
  $("#deleteLinkButton").onclick = () => {
    linksModalFunctionality.onPressDeleteButton(element);
  };
};

class LinksModalNavigation {
  openLinksModal() {
    let linksModal = $("#linksModal");
    if (linksModal.style.display === "flex") {
      linksModal.style.display = "none";
    } else {
      linksModal.style.display = "flex";
    }
  }

  closeLinksModal(e) {
    let linksModal = $("#linksModal");
    if (!linksModal.contains(e.target) && e.target.id !== "linksModalOpenBtn") {
      linksModal.style.display = "none";
      $("#moreOptionsDialog").classList.remove("show");
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
    $("#linksDiv").style.display = "none";
    $("#addLinkModal").style.display = "flex";
    $("#moreOptionsDialog").classList.remove("show");
    $("#linksModal").classList.add("next");
    $("#saveLinkButton").style.display = "block";
    $("#updateLinkButton").style.display = "none";
  }
  onPressGoBack() {
    $("#linksDiv").style.display = "flex";
    $("#addLinkModal").style.display = "none";
    $("#linksModal").classList.remove("next");
  }
  onPressEditButton(el) {
    chrome.storage.sync.get({ links: [] }, function (result) {
      let links = result.links;
      for (let i = 0; i < links.length; i++) {
        if (links[i].elementId === el.id) {
          $("#linksDiv").style.display = "none";
          $("#addLinkModal").style.display = "flex";
          $("#moreOptionsDialog").classList.remove("show");
          $("#linksModal").classList.add("next");
          $("#saveLinkButton").style.display = "none";
          $("#updateLinkButton").style.display = "block";
          $("#linkTitleInput").value = links[i].linkTitle;
          $("#linkLinksInput").value = links[i].linkLinks[0];
          $("#updateLinkButton").onclick = () => {
            console.log($("#linkTitleInput").value);
            links[i].linkTitle = $("#linkTitleInput").value;
            links[i].linkLinks[0] = $("#linkLinksInput").value;
            chrome.storage.sync.set({ links: links }, function () {
              initLinks();
            });
            new LinksModalFunctionality().onPressGoBack();
          };
        }
      }
      $(".bruh");
    });
  }
  onPressDeleteButton(el) {
    chrome.storage.sync.get({ links: [] }, function (result) {
      let links = result.links;
      for (let i = 0; i < links.length; i++) {
        if (links[i].elementId === el.id) {
          links.splice(links.indexOf(links[i]), 1);
        }
      }
      $("#moreOptionsDialog").classList.remove("show");
      chrome.storage.sync.set({ links: links }, function () {
        initLinks();
      });
    });
  }

  /**
   *  Update Links on addLink button click in linksModal
   * */
  addLink() {
    let linkTitleInput = $("#linkTitleInput").value;
    let linkLinksInput = $("#linkLinksInput").value;
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

  onClickMoreOptionsBtn(e) {
    let moreOptionsDialog = $("#moreOptionsDialog");
    moreOptionsDialog.classList.toggle("show");
    moreOptionsDialog.style.top = `${e.clientY - 20}px`;
    moreOptionsDialog.style.left = `${e.clientX - 80}px`;
  }

  editLink() {}
}
