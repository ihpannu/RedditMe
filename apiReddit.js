export default {
  search: function(searchTerm, searchLimit, sortBy) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit} `
    )
      .then(res => res.json())
      .then(data => data.data.children.map(data => data.data))
      .catch(err => console.log(err));
  }
};

("use strict");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  search: function search(searchTerm, searchLimit, sortBy) {
    return fetch(
      "http://www.reddit.com/search.json?q=" +
        searchTerm +
        "&sort=" +
        sortBy +
        "&limit=" +
        searchLimit +
        " "
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        return data.data.children.map(function(data) {
          return data.data;
        });
      })
      .catch(function(err) {
        return console.log(err);
      });
  }
};
