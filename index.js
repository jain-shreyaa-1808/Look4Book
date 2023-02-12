// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBOnWPfjkxzt36Z92fTXbDcK91hqCUw3Gc",
  authDomain: "look4book-377605.firebaseapp.com",
  projectId: "look4book-377605",
  storageBucket: "look4book-377605.appspot.com",
  messagingSenderId: "116565248494",
  appId: "1:116565248494:web:deeb6c8f3b1d94c41026ff"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  phone_number=document.getElementById('phone').value
  map_location = document.getElementById('map_location').value
  // milk_before_cereal = document.getElementById('milk_before_cereal').value
  // const data = {
  //   name: full_name,
  //   email: email,
  //   contact:{phone_no:"7838998791",isVerified:false},
  //   address:map_location
  // };
  // fetch("http://localhost:5000/api/users/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(data)
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log("Success:", data);
  //   })
  //   .catch(error => {
  //     console.error("Error:", error);
  //   });


  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(map_location) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      phone_number:phone_number,
      map_location : map_location,
      // milk_before_cereal : milk_before_cereal,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('vendors/' + user.uid).set(user_data)

    // DOne
    alert('Registrated Successfully!!');
    window.open('loginFormVendor.html');
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    // alert('User Logged In!!')
    window.open('vendorView.html')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

function postBook(){
  console.log("Hello")
  var user = auth.currentUser
  title = document.getElementById('book_name').value
  edition = document.getElementById('edition').value
  description = document.getElementById('description').value
  condition = document.getElementById('condition').value
  price = document.getElementById('price').value
  // firebase.database().ref('books/' + user).set({
  //   username: name,
  //   email: email,
  //   profile_picture : imageUrl
  // });
  const book = {
    title: title,
    edition: edition,
    condition: condition,
    price: price,
    description: description
  };
  console.log(book)
// let date  = Date.now()
console.log()
var messagesRef = firebase.database().ref('books');
var newMessageRef = messagesRef.push();
messagesRef.child('books/').set(book)
newMessageRef.child('books/').set(book)
// newMessageRef.set(book)
}
