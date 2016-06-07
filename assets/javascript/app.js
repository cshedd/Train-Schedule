var clickData = new Firebase("https://torrid-fire-1447.firebaseio.com/");

$(document).on("click", '#addInput', function() {
	var nameGiven = $('#trainName').val();
	var placeGiven = $('#place').val();
	var timeGiven = $('#trainTime').val();
	var rateGiven = $('#rate').val();
	console.log("List of things: " + nameGiven + placeGiven + timeGiven + rateGiven);

	clickData.push({
		"nameGivenFB": nameGiven,
		"placeGivenFB": placeGiven,
		"timeGivenFB": timeGiven,
		"rateGivenFB": rateGiven
	})

	nameGiven = $('#trainName').val("");
	placeGiven = $('#place').val("");
	timeGiven = $('#trainTime').val("");
	rateGiven = $('#rate').val("");


	return false;

});

clickData.on("child_added", function(childSnapshot){
	var appendName = childSnapshot.val().nameGivenFB;
	var appendRole = childSnapshot.val().placeGivenFB;
	var appendDate = childSnapshot.val().timeGivenFB;
	var appendRate = childSnapshot.val().rateGivenFB;
	var momentMonths = moment(new Date(appendDate));
	var currentMoment = moment();
	var howManyMonths = moment().diff(momentMonths, "months");
	var howMuchPaid = howManyMonths * childSnapshot.val().rateGivenFB;
	console.log(howManyMonths + " This is the months");
	console.log(appendName);
	$('#trainTable').prepend("<tr><td>" + appendName + "</td><td>" + appendRole + "</td><td>" +  appendDate + "</td><td>" + howManyMonths + "</td><td>" + appendRate + "</td><td>$" + howMuchPaid + "</td></tr>");

});


///dateAdded: Firebase.ServerValue.TIMESTAMP
//.on('child_added', function() {});


