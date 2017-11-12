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
  var firstTrain = moment($('#first-train-input').val().trim(), 'HH:mm').format('x');
  var frequency = moment($('#frequency-input').val().trim(), 'm').format('x');

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
  var frequencyOutput = moment(snapshot.val().frequency, 'x').format('m');

  var nextArrival = firstTrainOutput + frequencyOutput;
  console.log(nextArrival);
  nextArrival = moment(nextArrival, 'x').format('HH:mm');

  $('#schedule-output').append('<tr><td>' + nameOutput + '</td><td>' + destinationOutput + '</td><td>' + frequencyOutput + '</td><td>' + nextArrival + '</td><td>' + 'Minutes Away' +'</td></tr>');
});
