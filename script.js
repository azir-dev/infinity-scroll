// 获取 DOM
const loaderEl = document.getElementById("loader");
const imageContainer = document.getElementById("images");
// API config
const unsplashApiKey = "cStXuE6xn_4wW1hPA0b2vvQHuML14b3waPSSmF2tW74";
const imageCount = 10;
const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${imageCount}`;

let images = [];
let loadedImageCount = 0;
let isReady = false;

function checkAllImageLoaded() {
  loadedImageCount++;
  if (loadedImageCount === images.length) {
    isReady = true;
    loaderEl.hidden = true;
  }
}

/**
 * 设置多个属性
 * @param {HTMLElement} element
 * @param {Object} attributes
 */
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

/**
 *  显示图片
 */
function displayImage() {
  loadedImageCount = 0;
  isReady = false;
  images.forEach((image) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: image.links.html,
      target: "_blank",
    });

    const imgEl = document.createElement("img");
    setAttributes(imgEl, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.alt_description,
    });

    imgEl.addEventListener("load", checkAllImageLoaded);

    item.appendChild(imgEl);

    imageContainer.appendChild(item);
  });
}

async function getImages() {
  try {
    const response = await fetch(unsplashUrl);
    images = await response.json();
    displayImage();
  } catch (err) {
    alert(err);
  }
}

// 加载更多图片
window.addEventListener("scroll", () => {
  // 滚动到底部且每张图片都加载完成后
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    isReady
  ) {
    isReady = false;
    getImages();
  }
});

getImages();
