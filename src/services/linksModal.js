// Set the links in linksModal on startup
function initLinks() {
  let oldLinks = Array.from(document.getElementById("links").children);
  for (let i = 1; i < oldLinks.length; i++) {
    const element = oldLinks[i];
    document.getElementById("links").removeChild(element);
  }
  // document.getElementById("linksModal").children.forEach((element) => {});
  chrome.storage.sync.get("links", function (result) {
    if (!result.links) return;
    for (let i = 0; i < result.links.length; i++) {
      const element = result.links[i];
      document.getElementById("links").insertAdjacentHTML(
        "beforeend",
        `<div class="linkItem" id='${element.elementId}' draggable="true">
          <a href='${element.linkLinks[0]}'>
            <img
              class='favicon'
              src='${faviconLink(element.linkLinks[0])}'
              alt=''
            />
            <span>&nbsp;${element.linkTitle}</span>
          </a>
          <div class='linkMoreOptions' id='linkMoreOptions${element.elementId}'>
            <i class="bi bi-three-dots moreOptionsIcon"></i>
          </div>
        </div>`
        // <i class="bi bi-three-dots"></i>
      );
    }
  });
}
initLinks();

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
    // erase the old values if exists
    $("#linkTitleInput").value = "";
    $("#linkLinksInput").value = "";
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
            links[i].linkTitle = $("#linkTitleInput").value;
            links[i].linkLinks[0] = $("#linkLinksInput").value;
            chrome.storage.sync.set({ links: links }, function () {
              initLinks();
            });
            new LinksModalFunctionality().onPressGoBack();
          };
        }
      }
    });
  }
  onPressDeleteButton(el) {
    chrome.storage.sync.get({ links: [] }, function (result) {
      let links = result.links;
      for (let i = 0; i < links.length; i++) {
        if (links[i].elementId === el.id) {
          links.splice(links.indexOf(links[i]), 1);
          break;
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

// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================
// DRAG & DROP STUFF
// function dragStart(e) {
//   this.style.opacity = "0.4";
//   dragSrcEl = this;
//   e.dataTransfer.effectAllowed = "move";
//   e.dataTransfer.setData("text/html", this.innerHTML);
// }
// function dragEnter(e) {
//   this.classList.add("over");
// }
// function dragLeave(e) {
//   e.stopPropagation();
//   this.classList.remove("over");
// }
// function dragOver(e) {
//   e.preventDefault();
//   e.dataTransfer.dropEffect = "move";
//   return false;
// }
// function dragDrop(e) {
//   if (dragSrcEl != this) {
//     dragSrcEl.innerHTML = this.innerHTML;
//     this.innerHTML = e.dataTransfer.getData("text/html");
//   }
//   return false;
// }
// function dragEnd(e) {
//   var listItens = document.querySelectorAll(".linkItem");
//   [].forEach.call(listItens, function (item) {
//     item.classList.remove("over");
//   });
//   this.style.opacity = "1";
// }
// function addEventsDragAndDrop(el) {
//   el.addEventListener("dragstart", dragStart, false);
//   el.addEventListener("dragenter", dragEnter, false);
//   el.addEventListener("dragover", dragOver, false);
//   el.addEventListener("dragleave", dragLeave, false);
//   el.addEventListener("drop", dragDrop, false);
//   el.addEventListener("dragend", dragEnd, false);
// }
// var listItens = document.querySelectorAll(".linkItem");
// [].forEach.call(listItens, function (item) {
//   addEventsDragAndDrop(item);
// });
