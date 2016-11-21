$(document).ready(function() {
  $('form').submit(function(event) {

    event.preventDefault();
    var form = $(this);

    $.ajax({
      type: "GET",
      url: "/person",
      data: form.serialize(),
      dataType: "json",
      success: function(resp) {
        console.log(resp);
      }
    })
		.done(function( json ) {
      //Get the data from the JSON
			$("<p>").text("First name: " + json.firstname).appendTo("body");
      $("<p>").text("Last name: " + json.lastname).appendTo("body");
      $("<p>").text("Login ID: " + json.id).appendTo("body");
      $("<p>").text("Start date: " + json.startdate).appendTo("body");
		})
		.fail(function( xhr, status, errorThrown ) {
		    alert( "Failed to get the person!" );
		    console.log( "Error: " + errorThrown );
		    console.log( "Status: " + status );
		})
  });
});
