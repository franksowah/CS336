$( document ).ready(function() {

	$("body").append( "<button class='ui-button ui-widget ui-corner-all'>Get Data</button>" );
	$("body").append( "<p></p>");

	$("button").click(function() {
		$.ajax({
			url: "/fetch",
			type: "GET",
			data: {
				name: " Hello, Lab7!"
			}
		})
		.done(function (result) {
			console.log("Request succeeded");
			$("p").html(result.content + "</p>");
		})
		.fail(function(xhr, status, errorThrown) {
			console.log("Request failed");
			$("p").html("<p> No data yet </p>");
		})
	});

});
