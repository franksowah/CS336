$('form').submit(function( event ) {
	event.preventDefault();

	var form = $(this);

	$.ajax({
		type: 'POST',
		url: '/people',
		data: form.serialize(),
		dataType: 'json',
		success: function( result ) {
			console.log( "Request succeeded!" );
			$(".feedback").html("Person added!");
		},
		error: function( req, status, err ) {
			console.log('Something went wrong: ', status, err);
			$(".feedback").html("Couldn't add person, sorry.");
		}
	});
});
