let localImages = [
  // 'url("/assets/images/wallpapers/desert_tree.jpg")',
  // 'url("/assets/images/wallpapers/dunes.jpg")',
  // 'url("/assets/images/wallpapers/fiord.jpg")',
  // 'url("/assets/images/wallpapers/snow_mountains.jpg")',
  // 'url("/assets/images/wallpapers/snow.jpg")',
  // 'url("/assets/images/wallpapers/sunset.jpg")',
];

let onlineImages = [
  "url(https://i.ibb.co/KF5BNQH/sunset.jpg)",
  "url(https://i.ibb.co/8cypszv/fiord.jpg)",
  "url(https://i.ibb.co/16qksXL/snow-mountains.jpg)",
  "url(https://i.ibb.co/HpKR3fv/dunes.jpg",
];

for (let i = 1; i <= 41; i++) {
  const element = `url("/assets/images/resized/${i}.jpg")`;
  localImages.push(element);
}

const images = localImages;
