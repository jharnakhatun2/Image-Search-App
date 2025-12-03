const accessKey = "vKwJhVUtGHrQ3Oh6j_3UcT0mjgSYfovoUmoLZtZyzxY";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-image");
const searchResults = document.querySelector(".search-image");
const showMore = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchImage() {
  inputData = inputEl.value.trim();
  if (!inputData) return; 

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  if (results.length === 0 && page === 1) {
    searchResults.innerHTML = `<p style="color: red; text-align:center;">No images found for "${inputData}"</p>`;
    showMore.style.display = "none";
    return;
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("single-image");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description || "View Image";

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;

  if (results.length > 0) {
    showMore.style.display = "block";
  } else {
    showMore.style.display = "none"; 
  }
}

// Hide Show More initially
showMore.style.display = "none";

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImage();
});

showMore.addEventListener("click", () => {
  searchImage();
});
