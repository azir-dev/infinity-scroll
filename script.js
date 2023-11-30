const unsplashApiKey = "MBnbjbZls0N588ueg9p-cBeR-WJfmzTU95dfnJqyC8M";
const imageCount = 10;
const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${imageCount}`;

async function getImages() {
  try {
    const response = await fetch(unsplashUrl);
    const images = await response.json();
    console.log(images);
  } catch (err) {
    alert(err);
  }
}

getImages();
