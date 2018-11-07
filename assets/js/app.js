// Variable Declarations

var topics = ["overwatch", "red dead redemption 2", "halo", "guitar hero", "mario", "zelda"];
var staticGifs = [];
var animGifs = [];

// Functions

function renderButtons() {
    $("#searchButtons").html("");
    for (var i = 0; i < topics.length; i++) {
      var topicBtn = $("<button>");
      topicBtn.addClass("gameButton mr-2 btn btn-light");
      topicBtn.attr("data-game", topics[i]);
      topicBtn.text(topics[i]);
      $("#searchButtons").append(topicBtn);
    }
};

// Logic

    // Generate buttons

    renderButtons();

    // Add a new search button

    $("#add-game").on("click", function(event) {
        event.preventDefault();
        var game = $("#game-input").val().trim();
        topics.push(game);
        renderButtons();
        $("#game-input").empty();
    });

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
                gifImage.attr("src", results[j].images.fixed_width_still.url);
                gifImage.addClass("gif mx-1");
                gifImage.attr("gifid", [j]);
                gifImage.attr("data-static", results[j].images.fixed_width_still.url);
                gifImage.attr("data-anim", results[j].images.fixed_width.url);
                gifImage.attr("data-state", "static");
                gifDiv.append(p);
                gifDiv.append(gifImage);
                $("#results").prepend(gifDiv);
              }
            });
    });

    $("#results").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "static") {
            $(this).attr("src", $(this).attr("data-anim"));
            $(this).attr("data-state", "animated");
        } else {
            $(this).attr("src", $(this).attr("data-static"));
            $(this).attr("data-state", "static");
        }
    });


// Dev Notes:
//  * Return 5 gifs on click of a button in the searchButtons div, and put them in a single dynamically generated row
//  * Return 2 of these and log the number 10 in a variable, so 10 NEW ones can be queried upon a second click
//  * Generate buttons dynamically using array "topics"
//  * Add additional button
//  * Make GIF animate on click, then stop animation on additional click