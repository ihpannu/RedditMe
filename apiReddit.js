export default {
  search: function(searchTerm, searchLimit, sortBy) {
    fetch(`http://www.reddit.com/search.json?q=${searchTerm} `)
      .then(res => res.json())
      .then(data => console.log(data));
  }
};
