


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
var auth = firebase.auth();


$(".regiserButton").on("click", function handleSignUp(event) {
    event.preventDefault()
    var email = $("#user").val().trim();
    var password = $("#password").val().trim();
    if (email.length < 4) {
        $("#errorRegisterUser").html("<h3> Please enter an email address </h3>");
        return;
    }
    if (password.length < 4) {
        $("#errorRegisterPassword").html("<h3> Please create a password with more than 4 letters </h3>");
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            $("#errorRegisterPassword").html("<h3> Password is too weak </h3>");
        } else {
            $("#errorRegisterUser").html(errorMessage);
        }
        console.log(error);
       
    });

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

})
