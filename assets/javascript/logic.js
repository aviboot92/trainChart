
// alert("connected");
  var config = {
    apiKey: "AIzaSyCqId7Bm0qxvqwD2ZchVK8cEEtg7Ckq3QA",
    authDomain: "train-time-table-bcb9d.firebaseapp.com",
    databaseURL: "https://train-time-table-bcb9d.firebaseio.com",
    projectId: "train-time-table-bcb9d",
    storageBucket: "",
    messagingSenderId: "753978660493"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var currentTime = moment().format("HHmm");
var currentTime2 = moment().format("hh:mm A")
console.log(currentTime);
$("#currentTime").append(currentTime + " (" + currentTime2 + ")");
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = $("#train-time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency,
  };
  database.ref().push(newTrain);
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());
  var trainName = snapshot.val().name;
  var trainDestination = snapshot.val().destination;
  var trainTime = snapshot.val().time;
  var trainFrequency = snapshot.val().frequency;
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log(trainTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
 
  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
 
  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);
  
  var tMinutesTillTrain = trainFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrainTime = moment(nextTrain).format("hh:mm A");
  console.log("ARRIVAL TIME: " + nextTrainTime);
 
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrainTime),
    $("<td>").text(tMinutesTillTrain),
  );
 
  $("#train-table > tbody").append(newRow);
});