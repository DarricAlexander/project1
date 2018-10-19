var config = {
  apiKey: "AIzaSyAP9vTHkFhnYEAfO5QEV4-rqCVtdiX65dI",
  authDomain: "project1a-4aa81.firebaseapp.com",
  databaseURL: "https://project1a-4aa81.firebaseio.com",
  projectId: "project1a-4aa81",
  storageBucket: "project1a-4aa81.appspot.com",
  messagingSenderId: "709568554604"
};
firebase.initializeApp(config);

var database = firebase.database();

var userName = ""

var password = ""

var confirmPassword = ""

$("#registerbutton").on("click", function(event) {
    event.preventDefault();

    console.log("pushing")

    userName = $("#user").val().trim();
    console.log(userName);
    password = $("#password").val().trim();
    confirmPassword = $("#confirmpassword").val().trim();

    console.log(userName);
    console.log(password);
    console.log(confirmPassword);
    database.ref().push({
        user: user,
        password: password,
        confirmpassword: confirmpassword,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    

});

// function(errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   });

/* LOGIN SECTION*/
