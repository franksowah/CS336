$('form').submit(function( event ) {
	event.preventDefault();
	var input_id = document.getElementById('id').value;
	var route = '/person/' + input_id;
	var form = $( this );

	$.ajax({
		type: 'GET',
		url: route,
		dataType: 'json',
		success: function( result ) {
			console.log( "Request succeeded!");
			$(".result").html("<p>" + result.content + "</p>");
		},
		error: function( req, status, err ) {
			console.log('Something went wrong: ', status, err);
			$(".result").html("<p>" + "Couldn't get person, sorry." + "</p>");
		}
	});
});
