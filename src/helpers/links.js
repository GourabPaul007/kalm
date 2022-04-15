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
  if ((linkTitleInput == null || linkTitleInput == "") && (linkLinksInput == [null] || linkLinksInput == [""])) {
    return false;
  } else {
    return true;
  }
}

function faviconLink(link) {
  // let theLink;
  // if (link.startsWith("https://")) {
  //   let removedProtocolLink = link.substring(8);
  //   if (removedProtocolLink.indexOf("/") !== -1) {
  //     theLink = removedProtocolLink.substring(0);
  //   } else {
  //     theLink = removedProtocolLink;
  //   }
  //   console.log(theLink);
  // } else if (link.startsWith("http://")) {
  //   theLink = link.substring(7, link.substring(8).indexOf("/"));
  // } else {
  //   theLink = link;
  // }
  // return "https://icons.duckduckgo.com/ip2/" + theLink + ".ico";
  return (
    "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" + link + "&size=64"
  );
}

// function indexOfChar(str, char, n) {
//   let previousPosition = str.indexOf(char);
//   let pos2;
//   for (let i = 0; i < n - 1; i++) {
//     previousPosition++;
//     pos2 = str.indexOf(char, previousPosition);
//   }
//   return pos2;
// }
// console.log(indexOfChar("https://youtube.com", "/", 2));
