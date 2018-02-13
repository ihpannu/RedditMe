import reddit from "./apiReddit";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Form event listener
searchForm.addEventListener("submit", e => {
  //  Get search term
  const searchTerm = searchInput.value;
  //Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  // Get limit
  const searchLimit = document.getElementById("limit").value;

  if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
  }

  searchInput.value = "";

  //   search reddit
  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    let output = '<div class="card-columns">';
    // loop through post
    results.forEach(post => {
      //   console.log(results);
      //   this gets the image if available if not then shows the default image
      let image = post.preview
        ? post.preview.images[0].source.url
        : // : "https://media.giphy.com/media/7Cl6Q2A13HhkI/giphy.gif";
          "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
      output += `
        <div class="card" >
        <img class="card-img-top" src=${image} alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${truncateText(post.selftext, 100)} </p>
            <a href=${
              post.url
            } target="_blank" class="btn btn-primary red">Read More</a>
        <hr>
        <span class="badge badge-secondary dark">Subreddit: ${
          post.subreddit
        }</span>
        <span class="badge badge-dark light">Score: ${post.score}</span>
        </div>
        </div>
        `;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  //prevent default
  e.preventDefault();
});

// Function shows message
function showMessage(message, className) {
  //create div
  const div = document.createElement("div");
  //   add classes
  div.className = `alert ${className}`;
  //   add text
  div.appendChild(document.createTextNode(message));
  //Get the parent container
  const searchContainer = document.getElementById("search-container");
  // Get search
  const search = document.getElementById("search");
  //Insert message
  searchContainer.insertBefore(div, search);

  // Time out alert
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Truncate text

function truncateText(text, limit) {
  const shortened = text.indexOf("", limit);
  if (shortened === -1) return text;
  return text.substring(0, shortened);
}
