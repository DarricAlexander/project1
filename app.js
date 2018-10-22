


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBJINFK3PEzkcyIXTLm_Y326rWAkGgflD8",
    authDomain: "group-project1-35b77.firebaseapp.com",
    databaseURL: "https://group-project1-35b77.firebaseio.com",
    projectId: "group-project1-35b77",
<<<<<<< HEAD
    storageBucket: "",
=======
    storageBucket: "group-project1-35b77.appspot.com",
>>>>>>> 186045fd1be7fc4a7db439b4f60b5a5ea5cf854e
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

<<<<<<< HEAD
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
=======
})


$(".loginButton").on("click", function toggleSignIn(event) {
    event.preventDefault()
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = $("#userLogin").val().trim();
        var password = $("#passwordLogin").val().trim();
        if (email.length < 4) {
            $("#errorLoginUser").html("<h3> Please enter an email address </h3>");
            return;
        }
        if (password.length < 4) {
            $("#errorLoginPassword").html("<h3> Please create a password with more than 4 letters </h3>");
            return;
        }
        // Sign in with email and pass.

        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            window.location = 'index.html'
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                $("#errorLoginPassword").html("<h3> Wrong Password! Please try again. </h3>");
               
            } else {
                $("#errorLoginUser").html(errorMessage);
            }
            console.log(error);


        });

    }

})



$(".signoutButton").on("click", function handleSignUp() {
   
    auth.signOut().then(function() {
        window.location = 'loginpage.html'
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });


})


auth.onAuthStateChanged(function (user) {

    if (user) {
        console.log("working")
        // window.location = 'index.html'
    }

    else {
        console.log("not working")
    }
>>>>>>> 186045fd1be7fc4a7db439b4f60b5a5ea5cf854e

})
