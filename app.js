


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBJINFK3PEzkcyIXTLm_Y326rWAkGgflD8",
    authDomain: "group-project1-35b77.firebaseapp.com",
    databaseURL: "https://group-project1-35b77.firebaseio.com",
    projectId: "group-project1-35b77",
    storageBucket: "",
    messagingSenderId: "433243594797"
};
firebase.initializeApp(config);


var database = firebase.database();

var userName = ""

var password = ""

var confirmPassword = ""
function clearCreateAccount() {
 
}

$("#registerButton").on("click", function (event) {
    event.preventDefault();
    userName = $("#user").val().trim();
    password = $("#password").val().trim();
    confirmPassword = $("#confirmPassword").val().trim();
    
    console.log(userName);
    console.log(password);
    console.log(confirmPassword);
    database.ref().push({
        user: userName,
        password: password,
        confirmpassword: confirmPassword,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    $("#user").text("");
    $("#password").text("");
    $("#confirmPassword").text("");
    
    
    
  
});


// function(errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   });

/* LOGIN SECTION*/
