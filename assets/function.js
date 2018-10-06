console.log("js loaded");

//firebase initialization

var config = {
  apiKey: "AIzaSyBhGB1yyJ5Y38DvrzBvgf4PGWfVLt7Vuxk",
  authDomain: "train-schedule-5f11e.firebaseapp.com",
  databaseURL: "https://train-schedule-5f11e.firebaseio.com",
  storageBucket: "train-schedule-5f11e.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();


//adding functionality to the button
$(".submit").on("click", function (event) {
  event.preventDefault();


  //take the value of each field and set to a variable

  var trainName = $("#train-name-input").val();
  var destination = $("#destination-name-input").val();
  var firstTrain = $("#first-train-time-input").val();
  var frequency = $("#frequency-input").val();


  //temp object to hold on to everything the train data

  var newTrainAdded = {

    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  //push the info to firebase

  database.ref().push(newTrainAdded);

  //console logs
  
  console.log(newTrainAdded.train);
  console.log(newTrainAdded.destination);
  console.log(newTrainAdded.firstTrain);
  console.log(newTrainAdded.frequency);

  //modal to notify that train has been added successfully


  //clear out the fields once the modal is cleared out

  $("#train-name-input").val("");
  $("#destination-name-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});