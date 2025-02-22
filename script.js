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

      console.log("User Input:", recreationComplex);

      if (!recreationComplex) {
        document.getElementById("results").innerHTML =
          "<p>Please enter a complex name.</p>";
        return;
      }

      const apiUrl = `https://data.winnipeg.ca/resource/bmi4-vvs2.json?$where=upper(complex_name) like upper('%${recreationComplex}%')&$order=complex_name DESC&$limit=100`;

      const encodedURL = encodeURI(apiUrl);
      console.log("API URL:", encodedURL);

      fetch(encodedURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("API Response:", data); // Debugging
          console.log("Recreation Complex:", recreationComplex);
          console.log("API URL:", encodedURL);

          console.log("API Response:", data); // Full response
          console.log("Data Length:", data.length); // Check array length

          console.log("First Object in API Response:", data[0]); // Check structure
          console.log("All Data:", data);
          let resultsDiv = document.getElementById("results");
          resultsDiv.innerHTML = ""; // Clear previous results

          if (!Array.isArray(data) || data.length === 0) {
            resultsDiv.innerHTML = "<p>No recreation complexes found.</p>";
            return;
          }

          let output = "<ul>";
          data.forEach((complex) => {
            console.log("Checking object:", complex); // Debugging

            output += `
                <li>
                    <strong>${
                      complex.complex_name
                        ? complex.complex_name
                        : "No Name Available"
                    }</strong><br>
                     Address: ${
                       complex.address
                         ? complex.address
                         : "No address available"
                     }<br>
                     Arena: ${complex.arena ? complex.arena : "false"}<br>
                     Community Centre: ${
                       complex.community_centre
                         ? complex.community_centre
                         : "false"
                     }<br>
                     Indoor Pool: ${
                       complex.indoor_pool ? complex.indoor_pool : "false"
                     }<br>
                </li>
                <hr>
            `;
          });

          output += "</ul>";
          resultsDiv.innerHTML = output;
        })

        .catch((error) => {
          console.error("Error fetching data:", error);
          document.getElementById("results").innerHTML =
            "<p>Error retrieving data.</p>";
        });
    });
});
