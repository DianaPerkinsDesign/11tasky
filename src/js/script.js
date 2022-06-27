window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  Sortable.create(issuesList, {
    group: {
      name: "issuesList", // set both lists to same group
      pull: "clone", // To clone: set pull to 'clone'
    },
    animation: 150,
    filter: ".no-sortable",
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

  document
    .querySelectorAll("[data-behavior~=changeCompleteness]")
    .forEach((item) => {
      item.addEventListener("click", (event) => {
        const button = event.currentTarget;
        const issueId = button.closest("li").dataset.id;
        console.log("Updating completeness:", button.dataset.amount, issueId);
        button.classList.add("active");

        const oldCompleteness = JSON.parse(
          localStorage.getItem("completeness")
        );
        let newCompleteness = { ...oldCompleteness };
        newCompleteness[issueId] = button.dataset.amount;

        localStorage.setItem("completeness", JSON.stringify(newCompleteness));
      });

      // Grab the current completeness
      const completeness = JSON.parse(localStorage.getItem("completeness"));

      const issueId = item.closest("li").dataset.id;
      if (
        completeness &&
        completeness[issueId] &&
        completeness[issueId] === item.dataset.amount
      ) {
        item.classList.add("active");
      }
    });
});
