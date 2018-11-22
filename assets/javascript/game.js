var topics = ["waterfall", "forest", "hurricane", "tornado", "ocean", "beach", "lake", "mountain", "river", "whirlpool"]

function renderButtons() {

  //re-rendering all buttons each time one is added, empty previous ones
  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {
    var topRow = $("<button>");
    topRow.addClass("gif-btn");
    topRow.attr("data-name", topics[i]);
    topRow.text(topics[i]);
    $("#buttons-view").append(topRow);
  }
}

renderButtons();

$(document).on("click", ".gif-btn", displayGifs);

function displayGifs() {
  //empty previous gifs to not have so many on one page
  $("#gif-container").empty();
  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=oMBaD0jMiXQk30cFp3SWSP1OnRUt9EtN";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response)

    for (i = 0; i < topics.length; i++) {
      var gifDiv = $("<div class='newGif'>");

      var image = $("<img>")
      image.attr({
        "src": response.data[i].images.fixed_height_still.url,
        "data-still": response.data[i].images.fixed_height_still.url,
        "data-animate": response.data[i].images.fixed_height.url,
        "data-state": "still", "class": "gif"
      });

      var gifRating = $("<div>").text("Rating: " + response.data[i].rating.toUpperCase())
      gifRating.attr("class", "neat")

      gifDiv.append(image, gifRating);
      
      $("#gif-container").prepend(gifDiv);
    }
  });

}

$("#add-gif").on("click", function (event) {
  event.preventDefault();

  //making sure they can't add on an empty button
  if ($("#gif-input").val().trim() == '') {
    return;
  }
  else {
    var gif = $("#gif-input").val().trim();


    topics.push(gif);
    $("#gif-input").val('');

    renderButtons();
  }
});

$(document).on("click", ".gif", function () {

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});