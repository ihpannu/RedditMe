"use strict";

var _apiReddit = require("./apiReddit");

var _apiReddit2 = _interopRequireDefault(_apiReddit);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");

// Form event listener
searchForm.addEventListener("submit", function(e) {
  //  Get search term
  var searchTerm = searchInput.value;
  //Get sort
  var sortBy = document.querySelector('input[name="sortby"]:checked').value;

  // Get limit
  var searchLimit = document.getElementById("limit").value;

  if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
  }

  searchInput.value = "";

  //   search reddit
  _apiReddit2.default
    .search(searchTerm, searchLimit, sortBy)
    .then(function(results) {
      var output = '<div class="card-columns">';
      // loop through post
      results.forEach(function(post) {
        //   console.log(results);
        //   this gets the image if available if not then shows the default image
        var image = post.preview
          ? post.preview.images[0].source.url // : "https://media.giphy.com/media/7Cl6Q2A13HhkI/giphy.gif";
          : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
        output +=
          '\n    \n        <div class="card" >\n        <img class="card-img-top" src=' +
          image +
          ' alt="Card image cap">\n        <div class="card-body">\n            <h5 class="card-title">' +
          post.title +
          '</h5>\n            <p class="card-text">' +
          truncateText(post.selftext, 100) +
          " </p>\n            <a href=" +
          post.url +
          ' target="_blank" class="btn btn-primary red">Read More</a>\n        <hr>\n        <span class="badge badge-dark">Subreddit: ' +
          post.subreddit +
          '</span>\n        <span class="badge light">Score: ' +
          post.score +
          "</span>\n        </div>\n        </div>\n        ";
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
  var div = document.createElement("div");
  //   add classes
  div.className = "alert " + className;
  //   add text
  div.appendChild(document.createTextNode(message));
  //Get the parent container
  var searchContainer = document.getElementById("search-container");
  // Get search
  var search = document.getElementById("search");
  //Insert message
  searchContainer.insertBefore(div, search);

  // Time out alert
  setTimeout(function() {
    return document.querySelector(".alert").remove();
  }, 3000);
}

// Truncate text

function truncateText(text, limit) {
  var shortened = text.indexOf("", limit);
  if (shortened === -1) return text;
  return text.substring(0, shortened);
}

// import reddit from "./apiReddit";

// const searchForm = document.getElementById("search-form");
// const searchInput = document.getElementById("search-input");

// // Form event listener
// searchForm.addEventListener("submit", e => {
//   //  Get search term
//   const searchTerm = searchInput.value;
//   //Get sort
//   const sortBy = document.querySelector('input[name="sortby"]:checked').value;

//   // Get limit
//   const searchLimit = document.getElementById("limit").value;

//   if (searchTerm === "") {
//     showMessage("Please add a search term", "alert-danger");
//   }

//   searchInput.value = "";

//   //   search reddit
//   reddit.search(searchTerm, searchLimit, sortBy).then(results => {
//     let output = '<div class="card-columns">';
//     // loop through post
//     results.forEach(post => {
//       //   console.log(results);
//       //   this gets the image if available if not then shows the default image
//       let image = post.preview
//         ? post.preview.images[0].source.url
//         : // : "https://media.giphy.com/media/7Cl6Q2A13HhkI/giphy.gif";
//           "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
//       output += `

//         <div class="card" >
//         <img class="card-img-top" src=${image} alt="Card image cap">
//         <div class="card-body">
//             <h5 class="card-title">${post.title}</h5>
//             <p class="card-text">${truncateText(post.selftext, 100)} </p>
//             <a href=${
//               post.url
//             } target="_blank" class="btn btn-primary red">Read More</a>
//         <hr>
//         <span class="badge badge-dark">Subreddit: ${post.subreddit}</span>
//         <span class="badge light">Score: ${post.score}</span>
//         </div>
//         </div>
//         `;
//     });
//     output += "</div>";
//     document.getElementById("results").innerHTML = output;
//   });

//   //prevent default
//   e.preventDefault();
// });

// // Function shows message
// function showMessage(message, className) {
//   //create div
//   const div = document.createElement("div");
//   //   add classes
//   div.className = `alert ${className}`;
//   //   add text
//   div.appendChild(document.createTextNode(message));
//   //Get the parent container
//   const searchContainer = document.getElementById("search-container");
//   // Get search
//   const search = document.getElementById("search");
//   //Insert message
//   searchContainer.insertBefore(div, search);

//   // Time out alert
//   setTimeout(() => document.querySelector(".alert").remove(), 3000);
// }

// // Truncate text

// function truncateText(text, limit) {
//   const shortened = text.indexOf("", limit);
//   if (shortened === -1) return text;
//   return text.substring(0, shortened);
// }
