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
  $.cookie('first_word', $('#canvasForm input[name="first"]').val());
  $.cookie('second_word', $('#canvasForm input[name="second"]').val());
  if( navigator.userAgent.match('CriOS') ){
      window.open('https://www.facebook.com/dialog/oauth?client_id='+ _globalObj._facebook_app_id +'&redirect_uri='+ document.location.href + '&scope=email', '', null);
  }else{
    FB.login(function(response) {
      statusChecker(response);
    }, {scope: 'public_profile,email'});
  }
}




function statusChecker(response){

  var buttonLogin = $('.btn-main.login');
  var buttonLogout = $('.btn-main.logout');

  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    loginEvents();
    buttonLogin.hide();
    buttonLogout.show();
    // Set status
    _globalObj._login_status  = true;


    // logInToBackend(response.authResponse.userID);
  } else if (response.status === 'not_authorized') {
  	_globalObj._login_status  = false
    // The person is logged into Facebook, but not your app.
    // document.getElementById('status').innerHTML = 'Please log ' +
    // 'into this app.';

  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    _globalObj._login_status  = false
    buttonLogin.show();
    buttonLogout.hide();

    // document.getElementById('status').innerHTML = 'Please log ' +
    // 'into Facebook.';
  }
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : _globalObj._facebook_app_id,
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
function loginEvents() {
  FB.api('/me', function(response) {
    // console.log('response', response);
    logInToBackend(response);
    updateResponseText(response);
  });
}

function loadImage(response){
  var profileImageURL = 'https://graph.facebook.com/'+ response +'/picture?width=720&height=720';
  downloadImageForCanvas(profileImageURL);
  $('.img-color img').attr('src',profileImageURL);
  $("#hiddenToken").val(_globalObj._token);
}

function downloadImageForCanvas(url){
  // console.log('Download the image ');
  var data = {
      "_token" : _globalObj._token,
      "url" : url
    }

  $.ajax({
    type: 'POST',
    url: '/save-profile',
    data: data,
    dataType: 'text',
    success:function(data){
      // console.log(data);
     $('#profileImage').val(data);

     if($('#picture-steps').length){
       if($('#picture-steps').steps('getCurrentIndex') == 1){
             setTimeout(function(){
               $('#picture-steps').steps('next');
             }, 500);
       }
     }
    },
    error:function(){
      // failed request; give feedback to user
      console.log("error saving profile image");
    }
  });

}

function updateResponseText(response){
  // document.getElementById('status').innerHTML =
  // 'Thanks for logging in, ' + response.name + '!';
}

function logInToBackend(response){
  // console.log('log in user with fbID: ' + response.id)
  var data = {
    "_token" : _globalObj._token,
    "facebook_user_id" : response.id,
    "name" : response.name,
    "email" : "placeholder@gmail.com"
  }
  sendAjaxLogInRequest(data);

}

function logOutOfBackend(){
  // console.log('log out user with fbID');
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
      // console.log('You are logged in');
      // console.log('data:', data);
      loadImage(data);
    },
    error:function(){
        // failed request; give feedback to user
        // console.log("error data");
      }
    });

}

function sendAjaxLogOutRequest(data){
  $.ajax({
    type: 'GET',
    url: '/logout',
    dataType: 'text',
    success:function(data){
      // console.log('You are logged out');
      // console.log('data:', data);
    },
    error:function(){
        // failed request; give feedback to user
        // console.log("error with data");
      }
    });

}



$(function(){
  var buttonLogin = $('.btn-main.login');
  var buttonLogout = $('.btn-main.logout');
  buttonLogin.show();
  buttonLogout.hide();

  $(document).delegate('#fbLogin','click', function(e){
	  e.preventDefault();
	  checkLoginState();
	 });

  // Facebook logout event
  $(document).delegate('#fbLogout','click', function(e){
   e.preventDefault();
   // console.log('you clicked the fb logout');
   FB.logout(function(response) {
    var buttonLogin = $('.btn-main.login');
    var buttonLogout = $('.btn-main.logout');
   	// Set global status
   	_globalObj._login_status  = false

    $('.img-color img').attr('src','');
    $('#profileImage').val('');
    buttonLogin.show();
    buttonLogout.hide();
    logOutOfBackend();

    // document.getElementById('status').innerHTML = 'Please log ' +
    // 'into Facebook.';
  });
 });
});