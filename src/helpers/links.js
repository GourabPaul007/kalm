async function linkExists(url) {
  await fetch(url).then((e) => {
    log(e);
  });
}

/**
 * @param {String} linkTitleInput
 * @param {String} linkLinksInput
 * returns true or false after sanitizing inputs from addLinks modal
 * returns true ONLY if the parameters are sanitized
 */
function sanitizeInputs(linkTitleInput, linkLinksInput) {
  if (
    (linkTitleInput == null || linkTitleInput == "") &&
    (linkLinksInput == [null] || linkLinksInput == [""])
  ) {
    return false;
  } else {
    return true;
  }
}

function removeProtocolNameFromLink(link) {
  if (link.startsWith("https://")) {
    return link.substring(8);
  } else if (link.startsWith("http://")) {
    return link.substring(7);
  } else {
    return link;
  }
}
