var clickData = new Firebase("https://torrid-fire-1447.firebaseio.com/");

$(document).on("click", '#addInput', function() {
	var nameGiven = $('#trainName').val();
	var placeGiven = $('#place').val();
	var timeGiven = $('#trainTime').val();
	var freqGiven = $('#freq').val();
	freqGiven = parseInt(freqGiven);
	console.log("List of things: " + nameGiven + placeGiven + timeGiven + freqGiven);

	clickData.push({
		"nameGivenFB": nameGiven,
		"placeGivenFB": placeGiven,
		"timeGivenFB": timeGiven,
		"freqGivenFB": freqGiven
	})

	nameGiven = $('#trainName').val("");
	placeGiven = $('#place').val("");
	timeGiven = $('#trainTime').val("");
	freqGiven = $('#freq').val("");


	return false;


});

clickData.on("child_added", function(snapshot){   //listening to the event (i.e.event emitter), states the event, function (.on = a listener)
	console.log('child_added', snapshot.val());

	var nameGiven = snapshot.val().nameGivenFB;
	var placeGiven = snapshot.val().placeGivenFB;
	var timeGiven = snapshot.val().timeGivenFB;
	var freqGiven = snapshot.val().freqGivenFB;

	var childObject = snapshot.val();


	var firstTimeConverted = moment(timeGiven, "HH:mm").subtract(1, "years");
	console.log(firstTimeConverted);


	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	var timeRemaining = diffTime % freqGiven;
	console.log(timeRemaining);

	var minTilTrain = freqGiven - timeRemaining;
	console.log("MINUTES TILL TRAIN: " + minTilTrain);

	var nextTrain = moment().add(minTilTrain, "minutes");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


	$('#trainTable').prepend("<tr><td>" + nameGiven + "</td><td>" + placeGiven + "</td><td>" +  freqGiven + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minTilTrain + "</td></tr>");   //adding event listener for event child_added


});



