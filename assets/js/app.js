// Variable Declarations

var topics = ["overwatch", "red dead redemption 2", "halo", "guitar hero", "mario", "zelda"];

// Functions

function renderButtons() {
    $("#searchButtons").html("");
    for (var i = 0; i < topics.length; i++) {
      var topicBtn = $("<button>");
      topicBtn.addClass("gameButton");
      topicBtn.attr("data-game", topics[i]);
      topicBtn.text(topics[i]);
      $("#searchButtons").append(topicBtn);
    }
};

// Logic

    // Generate buttons

    renderButtons();

    // AJAX query to GIPHY
    $("#searchButtons").on("click", ".gameButton", function() {
        var game = $(this).attr("data-game");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KQp7lWT9F6GHyJRTS7bdFUoZB9eb8zOF&limit=10&q="+game;
        $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
              console.log(queryURL);
    
              console.log(response);
              var results = response.data;
    
              for (var j = 0; j < results.length; j++) {
                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[j].rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[j].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(gifImage);
                $("#results").prepend(gifDiv);
              }
            });
    });


// Dev Notes:
//  * Return 5 gifs on click of a button in the searchButtons div, and put them in a single dynamically generated row
//  * Return 2 of these and log the number 10 in a variable, so 10 NEW ones can be queried upon a second click
//  * Generate buttons dynamically using gameArray
//  * Add additional button
//  * Make GIF animate on click, then stop animation on additional click