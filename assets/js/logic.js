$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCZCfai9qe6pKgofxCQU2gGtOriXpF438I",
    authDomain: "on-time-train-time.firebaseapp.com",
    databaseURL: "https://on-time-train-time.firebaseio.com",
    projectId: "on-time-train-time",
    storageBucket: "on-time-train-time.appspot.com",
    messagingSenderId: "933947614207"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //SUBMIT NEW TRAINS
  $('#submit-button').on('click', function() {
    console.log('CLICK!');

    event.preventDefault();

    var name = $('#train-name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var firstTrain = $('#first-train-input').val().trim();
    var frequency = $('#frequency-input').val().trim();

    database.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    });

    //CLEAR INPUT FEILDS
    $('#train-name-input').val('');
    $('#destination-input').val('');
    $('#first-train-input').val('');
    $('#frequency-input').val('');

  });

  //ADDS NEW TRAINS TO SCHEDULE
  database.ref().on('child_added', function(snapshot) {
    var nameOutput = snapshot.val().name;
    var destinationOutput = snapshot.val().destination;
    var firstTrainOutput = snapshot.val().firstTrain;
    var frequencyOutput = snapshot.val().frequency;

    var firstTrainConvert = moment(firstTrainOutput, 'HH:mm');
    var timeDifference = moment().diff(firstTrainConvert, 'minutes');

    var timeRemainder = timeDifference % frequencyOutput;
    var trainMinutes = frequencyOutput - timeRemainder;
    var nextArrival = moment().add(trainMinutes, 'minutes').format('HH:mm');

    $('#schedule-output').append('<tr><td>' + nameOutput + '</td><td>' + destinationOutput + '</td><td>' + frequencyOutput + '</td><td>' + nextArrival + '</td><td>' + trainMinutes +'</td></tr>');
  });
});
