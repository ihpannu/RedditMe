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
  reddit.search(searchTerm, searchLimit, sortBy);

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
