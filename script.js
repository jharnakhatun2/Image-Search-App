const accessKey = "vKwJhVUtGHrQ3Oh6j_3UcT0mjgSYfovoUmoLZtZyzxY";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-image");
const searchResults = document.querySelector(".search-image");
const showMore = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchImage() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
  
  if (page === 1) {
    searchResults.innerHTML = "";
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
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
  page++;

  if (page > 1) {
    showMore.style.display = "block";
  }
}
// Add this line to hide the button initially
showMore.style.display = "none";

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImage();
});

showMore.addEventListener("click", () => {
  searchImage();
});
