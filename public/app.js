// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page


      //$("#articles").append("< data-id='h2" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");

      let h3 = $("<h3>")
      let p = $("<p>")
      let div = $("<div>")
      let a = $("<a>")
      let btn = $("<button>")
      


      h3.text(data[i].title)

      p.text(data[i].summary)
      
      a.attr("target", "_blank")

      a.attr("href", data[i].link)

      a.html(h3)

      btn.addClass("noteBtn")
      btn.text("Leave a comment")
      div.append(a,p,btn)
      div.addClass("individualArticle")
      $("#articles").append(div)
    }
  });
  
  
  // Whenever someone clicks the leave a comment button
  $(document).on("click", ".noteBtn", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        $(".noteBtn").hide()
        // The title of the article
        $(".individualArticle").append("<h2>Add a comment</h2>");
        // An input to enter a new title
        $(".individualArticle").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $(".individualArticle").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $(".individualArticle").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });