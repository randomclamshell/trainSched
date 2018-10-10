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
$("#submit").on("click", function (event) {
  event.preventDefault();


  //take the value of each field and set to a variable

  var trainName = $("#train-name-input").val();
  var destination = $("#destination-name-input").val();
  var firstTrain = $("#first-train-time-input").val();
  var frequency = $("#frequency-input").val();


  //temp object to hold on to the train data

  var newTrainAdded = {

    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  //push the info to firebase

  database.ref().push(newTrainAdded);

  //console logs
  
  console.log(newTrainAdded.trainName);
  console.log(newTrainAdded.destination);
  console.log(newTrainAdded.firstTrain);
  console.log(newTrainAdded.frequency);

  //modal to notify that train has been added successfully


  //clear out the fields once the modal is cleared out

  $("#train-name-input").val("");
  $("#destination-name-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");

  return false;
});

//adding firebase functionality

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  //format the firsttrain

  // var firstTrainFormatted = moment.unix(firstTrain).format("hh:mm");

  // console.log(firstTrainFormatted);


   // Time is 3:30 AM
   var firstTime = "03:30";

   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
   console.log(firstTimeConverted);

   // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

   // Difference between the times
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("DIFFERENCE IN TIME: " + diffTime);

   // Time apart (remainder)
   var tRemainder = diffTime % frequency;
   console.log(tRemainder);

   // Minute Until Train
   var tMinutesTillTrain = frequency - tRemainder;
   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   // Next Train
   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var arrTime = moment(nextTrain).format("hh:mm");
  
  $("#train-table").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + 
  "</td><td>" + arrTime + "</td>" + "<td>" + tMinutesTillTrain + "</tr>");
});