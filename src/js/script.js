window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  Sortable.create(issuesList, {
    group: {
      name: "issuesList", // set both lists to same group
      pull: "clone", // To clone: set pull to 'clone'
    },
    animation: 150,
    filter: ".ignore-elements",
    store: {
      /**
       * Get the order of elements. Called once during initialization.
       * @param   {Sortable}  sortable
       * @returns {Array}
       */
      get: function (sortable) {
        var order = localStorage.getItem(sortable.options.group.name);
        return order ? order.split("|") : [];
      },

      /**
       * Save the order of elements. Called onEnd (when the item is dropped).
       * @param {Sortable}  sortable
       */
      set: function (sortable) {
        var order = sortable.toArray();
        localStorage.setItem(sortable.options.group.name, order.join("|"));
      },
    },
  });
});
