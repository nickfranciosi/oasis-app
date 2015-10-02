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

  $(document).delegate('#delete-user', 'click', function(e){
    var route = $(this).attr('href');
    console.log(route);
    FB.logout(function(response){
      window.location(route);
    });
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
// Document ready
jQuery(document).ready(function($){

	/*
		Diagonal cut across homepage
	*/

	$('#intro').height($(window).height() - 80);
	$('section .cut').each(function() {
	  if ($(this).hasClass('cut-top'))
	    $(this).css('border-right-width', $(this).parent().width() + "px");
	  else if ($(this).hasClass('cut-bottom'))
	    $(this).css('border-left-width', $(this).parent().width() + "px");
	});



	/*
		Set up jQuery Steps for picture process
		jQuery Steps
		https://github.com/rstaib/jquery-steps
	*/

	var pictureSteps = $('#picture-steps');
	pictureSteps.steps({
	  headerTag: "h2.sr-only",
	  bodyTag: "section",
	  transitionEffect: "fade",
	  autoFocus: true,
	  saveState: true,

	  onStepChanging: function (event, currentIndex, newIndex) {

	  	if (currentIndex > newIndex) {
	      return true;
	    }

	    // First slide with word selection
	  	var selectedWord = $('.selected-word.selected');
			if ( currentIndex == 0 && selectedWord.length > 1 ) {
				return true;
	  	}

	  	if ( currentIndex == 0 && selectedWord.length <= 1 ) {
	  		// Error
	  		$('#modal-error').modal('show');
	  		$('#modal-error .header').replaceWith('<h3 class="header text-center">Please Select A Few More Words.</h3>');
	  		return false;
	  	}

	  	if ( currentIndex == 1 && _globalObj._login_status == true ) {
				return true;
			}

			if ( currentIndex == 1 && newIndex == 2 && _globalObj._login_status == false ) {
				$('#modal-error').modal('show');
		  	$('#modal-error .header').replaceWith('<h3 class="header text-center">Please Login to Facebook</h3>');
			} else if ( currentIndex == 1 && newIndex == 0 && _globalObj._login_status == false ) {
				return true;
			}
	  },
	  onFinished: function (event, currentIndex) {
	   	$('#canvasForm').submit();
	  }
	});




	/*
		Selecting a word for picture process
	*/

	var sectionHalf    = $('#picture-steps-p-0 .step-half'),
			selectedWord   = $('.step-list ul > li > a'),
			sectionBottom  = $('#picture-steps-p-0 .step-bottom');

	// Add tranform on load for ie9
	sectionBottom.css({
		'-webkit-transform' : 'translateY(50%)',
		'-ms-transform' : 'translateY(50%)',
		'transform' : 'translateY(50%)'
	});

	// Expand half sextions
	sectionHalf.on('click', function() {
		var sectionTop     = $('#picture-steps-p-0 .step-top'),
		    sectionTop     = $('#picture-steps-p-0 .step-top'),
		    sectionList    = $('.step-list');

		function toTop() {
		  sectionHalf.animate({
		    scrollTop: sectionHalf.offset().top - 100
		  }, 300);
		}

	  // When section is open
	  if ( $(this).hasClass('is-open') ) {
	  	// Remove classes and go to top
	    $(this).removeClass('is-open').addClass('collapsed');
	    toTop();
	  } else {
	    $(this).addClass('is-open')
	    	.removeClass('collapsed');
	  }

	  if ( sectionTop.hasClass('is-open') ) {
	  	sectionBottom.css({
				'-webkit-transform' : 'translateY(100%)',
				'-ms-transform' : 'translateY(100%)',
				'transform' : 'translateY(100%)'
			});
	  } else {
	  	sectionBottom.css({
				'-webkit-transform' : 'translateY(50%)',
				'-ms-transform' : 'translateY(50%)',
				'transform' : 'translateY(50%)'
			});
	  }

	  if ( sectionBottom.hasClass('is-open') ) {

	  	sectionBottom.css({
				'-webkit-transform' : 'translateY(0)',
				'-ms-transform' : 'translateY(0)',
				'transform' : 'translateY(0)'
			});

			sectionTop.css({
				'-webkit-transform' : 'translateY(-10%)',
				'-ms-transform' : 'translateY(-10%)',
				'transform' : 'translateY(-10%)'
			});
	  } else {
	  	sectionTop.css({
				'-webkit-transform' : 'translateY(0)',
				'-ms-transform' : 'translateY(0)',
				'transform' : 'translateY(0)'
			});
	  }
	});

	// Collect values for canvas

  $('#positive-list  li > a').on('click', function(e){
      e.preventDefault();
      // console.log($(this).text());
      $('#canvasForm input[name="first"]').val($(this).text());
      $.cookie('first_word', $(this).text());
  });

  $('#negative-list  li > a').on('click', function(e){
      e.preventDefault();
      // console.log($(this).text());
      $('#canvasForm input[name="second"]').val($(this).text());
      $.cookie('second_word', $(this).text());
  });


	// When a word is selected from list of words
	selectedWord.on('click', function(event) {
	  event.preventDefault();

	  var selectedWord = $(this).closest('.step-half').find('.selected-word').text();
	  		selectedText = $(this).text(),
	  		pictureWordFirst = $('.img-color .words span:first-child'),
	  		pictureWordLast = $('.img-color .words span:last-child'),
	  		closestStep = $(this).closest('.step-half');


	  // Find closest selected word and replace it
	  closestStep.find('.selected-word')
	  	.replaceWith('<span class="selected-word selected color-accent animated flipInX">' + selectedText + '</span>');

	  // Update the words on the picture screen
	  if (closestStep.hasClass('step-top')) {
	  	pictureWordFirst.text(selectedText);
	  	$('#canvasForm input[name="first"]').val(selectedText);

	  } else {
	  	pictureWordLast.text(selectedText);
	  }
	});



	/*
		Initiate Color Picker
	*/
	// Color picker
	// // http://www.bamdaa.com/demo/color-picker/
	// $(".cp-fullscreen").colorPicker({
	// 	// Get colors from json
	// 	colors: 'colors.json',

	// 	// Fill background overlay
	//   onSelect: function(ui, color){
	//     $('.color-overlay').css('background-color', color);
	//     console.log(color);

	//     // Add to the form
	//     $('#canvasForm input[name="color"]').val(color);
	//   }
	// });




	/*
		Video on homepage
	*/
	// Video controls
	$("#video-controls").click(function() {
	  // Play video
	  var video = $("#video-promo").get(0);
	  video.play();
	  // Fade out overlay
	  $(this).fadeOut();
	  return false;
	});
	// Allow controls on hover
	$('#video-promo').hover(function toggleControls() {
	  if (this.hasAttribute("controls")) {
	    this.removeAttribute("controls")
	  } else {
	    this.setAttribute("controls", "controls")
	  }
	});



	/*
		Return user to color screen when they come back from login
	*/
	if($.cookie('first_word') != undefined){
    // console.log('we have a cookie set');
    if($('#picture-steps').length){
          if($('#picture-steps').steps('getCurrentIndex') == 1){
                setTimeout(function(){
                  $('#picture-steps').steps('next');
                }, 500);
          }
     }
    setWordsOnImageFromCookie($.cookie('first_word'), $.cookie('second_word'));
  }



  /*
  	On scroll little helper div
  */
	var offset = 300,
		offset_opacity = 2200,
		scroll_top_duration = 700,
		$helpPop = $('.helpPop');

	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $helpPop.addClass('is-visible') : $helpPop.removeClass('is-visible fade-out');
		if( $(this).scrollTop() > offset_opacity ) {
			$helpPop.addClass('fade-out');
		}
	});

	//smooth scroll to top
	$helpPop.on('click', function(event){
		event.preventDefault();

		// Show a modal
		$('#modal-help').modal('show');

		// Back to top functionality if we evey wanna switch it
		// $('body,html').animate({
		// 	scrollTop: 0 ,
		//  	}, scroll_top_duration
		// );
	});


	/*
		Color picker thing
	*/

	$('#color-block .color:first-child').css({
		'-webkit-transform' : 'scale(0.8)',
		'-ms-transform' : 'scale(0.8)',
		'transform' : 'scale(0.8)'
	});

	$('#color-block .color').on('click', function(color) {

	// Remove the css bitch
	$('#color-block .color').removeAttr("style");

		event.preventDefault();

		var color = $(this).data('hex');

		$(this).css({
			'-webkit-transform' : 'scale(0.8)',
			'-ms-transform' : 'scale(0.8)',
			'transform' : 'scale(0.8)'
		});

		$('.color-overlay').css('background-color', color);
    // Add to the form
    $('#canvasForm input[name="color"]').val(color);

	});

});



// Window ready
$(window).on('load', function() {

  // Preloader gif
  $('.preloader').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    $('.preloader').hide();
  });

	var introTable = $('.intro-tables');
  introTable.addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
  setTimeout(function(){
		introTable.addClass('visible');
	}, 200);

});





function setWordsOnImageFromCookie(first,second){
	var pictureWordFirst = $('.img-color .words span:first-child'),
	pictureWordLast = $('.img-color .words span:last-child'),
	listWordFirst = $('.step-top span.selected-word'),
	listWordLast = $('.step-bottom span.selected-word');

	pictureWordFirst.text(first);
	pictureWordLast.text(second);
	listWordFirst.addClass('selected color-accent animated flipInX');
	listWordLast.addClass('selected color-accent animated flipInX');
	listWordFirst.text(first);
	listWordLast.text(second);

	$('#canvasForm input[name="first"]').val(first);
	$('#canvasForm input[name="second"]').val(second);
}



//# sourceMappingURL=app.js.map