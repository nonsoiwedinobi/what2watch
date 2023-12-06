// This .on("click") function will trigger the fetch() Call
$("#search-button").on("click", function (event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();
    getMovieResults();
    getNewsResults();
    
    });

// Function to handle "Enter" key press in the search input
$("#search-input").keydown(function (event) {
  // Check if the pressed key is "Enter" (key code 13)
  if (event.which === 13) {
      event.preventDefault();
    getMovieResults();
    getNewsResults();
  }
});
function getMovieResults() {  
    // Here we grab the text from the input box
    var movie = $("#search-input").val();
  
    // construct our URL
    var queryURL = "https://api.themoviedb.org/3/search/multi?query=" + movie + "%20&include_adult=false&language=en-US&page=1&api_key=82837fb1b2989de9a2119490555d3ff2";
  

    // fetch the data
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        // Update your HTML with the movie details as needed
        $("#title").text("Title: " + data.results[0].original_title);
        $("#rating").text("Rating: " + data.results[0].vote_average);
        $("#genre").text("Release Date: " + data.results[0].release_date);
        $("#description").text("Description: " + data.results[0].overview);

        // Update the movie image with the poster path
        var posterPath = "https://image.tmdb.org/t/p/w500" + data.results[0].poster_path;
        $("#movie_image").attr("src", posterPath);
      });

      
  
    // -----------------------------------------------------------------------
    }

function getNewsResults() {

    var news = $("#search-input").val();

    var queryURL = "https://api.currentsapi.services/v1/search?keywords=" + news + "&language=en&apiKey=KSPwA6FKSdpnL53Uj6Mofz_OsBlL2E62hiZPojCTXf0LvC2z";

    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        $("#news-text").text(data.news[0].title);
        var descriptionEl = $("<p>");
        descriptionEl.text(data.news[0].description);
        $("#news-text").append(descriptionEl);
      });
    }
  