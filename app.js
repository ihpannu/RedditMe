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
      output += `
        <div class="card" >
        <img class="card-img-top" src="..." alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
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
