// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  statusChecker(response);
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  // FB.getLoginStatus(function(response) {
  //   statusChangeCallback(response);
  // });
FB.login(function(response) {
  statusChecker(response);
});
}

function statusChecker(response){
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    loadImage();
    logInToBackend(response.authResponse.userID);
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into Facebook.';
  }
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1477990922522983',
  cookie     : true,  // enable cookies to allow the server to access 
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.2' // use version 2.2
});
// Now that we've initialized the JavaScript SDK, we call 
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function loadImage() {
  FB.api('/me', function(response) {
    var profileImageURL = 'https://graph.facebook.com/'+ response.id +'/picture??width=500&height=500';
    $('.img-color img').attr('src',profileImageURL);
    $('#profileImage').val(profileImageURL);
    $("#hiddenToken").val(_globalObj._token);
    document.getElementById('status').innerHTML =
    'Thanks for logging in, ' + response.name + '!';
  });
}

function logInToBackend(fbID){
  console.log('log in user with fbID: ' + fbID)
  var data = {
    "_token" : _globalObj._token,
    "facebook_user_id" : fbID,
    "name" : "Nick Franciosi",
    "email" : "fran@gmial.com"
  }
  sendAjaxLogInRequest(data);

}

function logOutOfBackend(){
  console.log('log out user with fbID');
  var data = {
    "_token" : _globalObj._token
  }
  sendAjaxLogOutRequest();

}

function sendAjaxLogInRequest(data){
  $.ajax({
    type: 'POST',
    url: '/login',
    data: data,
    dataType: 'text',
    success:function(data){
      console.log('You are logged in');
      console.log('data:', data);
    },
    error:function(){
        // failed request; give feedback to user
        console.log("error data");
      }
    });

}

function sendAjaxLogOutRequest(data){
  $.ajax({
    type: 'GET',
    url: '/logout',
    dataType: 'text',
    success:function(data){
      console.log('You are logged out');
      console.log('data:', data);
    },
    error:function(){
        // failed request; give feedback to user
        console.log("error data");
      }
    });

}



$(function(){

  $(document).delegate('#fbLogin','click', function(e){
   e.preventDefault();
   checkLoginState();
 });

  $(document).delegate('#fbLogout','click', function(e){
   e.preventDefault();
   console.log('you clicked the fb logout');
   FB.logout(function(response) {
    $('.img-color img').attr('src','');
    $('#profileImage').val('');
    logOutOfBackend();
    document.getElementById('status').innerHTML = 'Please log ' +
    'into Facebook.';
  });
 });
});