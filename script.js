/******w**************
    
    Assignment 4 Javascript
    Name: Tosin Adewumi
    Date: 20th February, 2025
    Description: Javascript for Building a Search Form for Recreation Complexes in Winnipeg

*********************/

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); //Prevent form submission
      let recreationComplex = document
        .getElementById("recreationComplex")
        .value.trim();

      if (!recreationComplex) {
        document.getElementById("results").innerHTML =
          "<p>Please enter a complex name.</p>";
        return;
      }

      const apiUrl = `https://data.winnipeg.ca/resource/bmi4-vvs2.json?$where=lower(recreation_complex) LIKE lower('%25${encodeURIComponent(
        recreationComplex
      )}%25')&$order=recreation_complex ASC&$limit=100`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          let resultsDiv = document.getElementById("results");
          resultsDiv.innerHTML = "";

          if (data.length === 0) {
            resultsDiv.innerHTML = "<p>No parks found.</p>";
          } else {
            let output = "<ul>";
            data.forEach((complex) => {
              output += `<li><strong>${complex.recreation_complex}</strong> - ${complex.neighbourhood}</li>`;
            });
            output += "</ul>";
            resultsDiv.innerHTML = output;
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          document.getElementById("results").innerHTML =
            "<p>Eror retrieving data.</p>";
        });
    });
});
