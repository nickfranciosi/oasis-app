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
  if( navigator.userAgent.match('CriOS') ){
      window.open('https://www.facebook.com/dialog/oauth?client_id='+ _globalObj._facebook_app_id +'&redirect_uri='+ document.location.href + '&first=test&second=cool&scope=email', '', null);
  }else{
    FB.login(function(response) {
      statusChecker(response);
    }, {scope: 'email'});
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
    _globalObj._login_status  = true

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
    console.log('response', response);
    logInToBackend(response);
    // loadImage(response);
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
  console.log('Download the image ');
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
      console.log(data);
     $('#profileImage').val(data);
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
  console.log('log in user with fbID: ' + response.id)
  var data = {
    "_token" : _globalObj._token,
    "facebook_user_id" : response.id,
    "name" : response.name,
    "email" : "placeholder@gmail.com"
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
      loadImage(data);
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
  var buttonLogin = $('.btn-main.login');
  var buttonLogout = $('.btn-main.logout');
  buttonLogin.hide();
  buttonLogout.hide();

  $(document).delegate('#fbLogin','click', function(e){
	  e.preventDefault();
	  checkLoginState();
	 });

  // Facebook logout event
  $(document).delegate('#fbLogout','click', function(e){
   e.preventDefault();
   console.log('you clicked the fb logout');
   FB.logout(function(response) {
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
// Step process
// https://github.com/rstaib/jquery-steps
var pictureSteps = $('#picture-steps');

function updateForm() {
	var canvasFormID = '#canvasForm',
			canvasForm = $(canvasFormID),
  		firstWord     = $(canvasFormID + ' ' + 'input[name="first"]');
}

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


// Color picker
// http://www.bamdaa.com/demo/color-picker/
$(".cp-fullscreen").colorPicker({
	// get colors from json
	colors: 'colors.json',

	// fill background overlay
  onSelect: function(ui, color){
    $('.color-overlay').css('background-color', color);
    console.log(color);

    //add to the form
    $('#canvasForm input[name="color"]').val(color);
  }
});




// Select sections
var sectionHalf    = $('#picture-steps-p-0 .step-half'),
    sectionTop     = $('.step-top'),
    sectionBottom  = $('.step-bottom'),
    sectionList    = $('.step-list'),
    selectedWord   = $('.step-list ul > li > a');


sectionHalf.on('click', function() {
  sectionHalf.animate({
    scrollTop: sectionHalf.offset().top - 100
  }, 200);

  // When section is open
  if ( $(this).hasClass('is-open') ) {
  	// Return to top of div if you have scrolled down to select something
    sectionHalf.animate({
    scrollTop: sectionHalf.offset().top - 100
  }, 200);

    // Remove open and animations and collapse
    $(this).removeClass('is-open').addClass('collapsed');
    $(this).find(sectionList).removeClass('animated fadeIn').addClass('animated fadeOut');

  } else {
    $(this).find(sectionList).removeClass('animated fadeOut');
    $(this).find(sectionList).addClass('animated fadeIn');
    $(this).addClass('is-open').removeClass('collapsed');
  }

  // Bottom step
  if ( $(this).hasClass('step-bottom is-open') ) {
    sectionTop.addClass('squish');
  } else {
    sectionTop.removeClass('squish');
  }

});




// Word is selected from list of words
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




// Load
$(window).on('load', function() {

  // Preloader
  // $('.preloader').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
  //   $('.preloader').hide();
  // });
	var introTable = $('.intro-tables');
  introTable.addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
  setTimeout(function(){
		introTable.addClass('visible');
	}, 200);

});


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





jQuery(document).ready(function($){

	// Dynamic height of cut thing
	$('#intro').height($(window).height() - 80);
	$('section .cut').each(function() {
	  if ($(this).hasClass('cut-top'))
	    $(this).css('border-right-width', $(this).parent().width() + "px");
	  else if ($(this).hasClass('cut-bottom'))
	    $(this).css('border-left-width', $(this).parent().width() + "px");
	});

		$('#canvasForm input[name="first"]').val('');

    $('#positive-list  li > a').on('click', function(e){
        e.preventDefault();
        console.log($(this).text());
        $('#canvasForm input[name="first"]').val($(this).text());
    });

    $('#negative-list  li > a').on('click', function(e){
        e.preventDefault();
        console.log($(this).text());
        $('#canvasForm input[name="second"]').val($(this).text());
    });


    if( $('.cd-form').length > 0 ) {
        //set some form parameters
        var device = checkWindowWidth(),
        tableFinalWidth = ( device == 'mobile') ? $(window).width()*0.9 : 210,
        tableFinalHeight = ( device == 'mobile' ) ? 93 : 255;
        formMaxWidth = 900,
        formMaxHeight = 650,
        animating =  false;

        //set animation duration/delay
        var animationDuration = 800,
        delay = 200,
        backAnimationDuration = animationDuration - delay;

        //store DOM elements
        var formPopup = $('.cd-pricing'),
        coverLayer = $('.cd-overlay');

        //select a plan and open the signup form
        formPopup.on('click', 'a', function(event){
            event.preventDefault();
            triggerAnimation( $(this).parents('.cd-pricing-footer').parent('li'), coverLayer, true);
        });

        //close the signup form clicking the 'X' icon, the keyboard 'esc' or the cover layer
        $('.cd-form').on('click', '.cd-close', function(event){
            event.preventDefault();
            triggerAnimation( formPopup.find('.selected-table'), coverLayer, false);
        });
        $(document).keyup(function(event){
            if( event.which=='27' ) {
                triggerAnimation( formPopup.find('.selected-table'), coverLayer, false);
            }
        });
        coverLayer.on('click', function(event){
            event.preventDefault();
            triggerAnimation( formPopup.find('.selected-table'), coverLayer, false);
        });

        //on resize - update form position/size
        $(window).on('resize', function(){
            requestAnimationFrame(updateForm);
        });

        //show/hide credit card fields if user selected credit card as gateway
        $('.cd-payment-gateways').on('change', function(){
            ($('#card').is(':checked'))
            ? $('.cd-credit-card').velocity("slideDown", { duration: 300 })
            : $('.cd-credit-card').velocity("slideUp", { duration: 300 });
        });

    }

    function triggerAnimation(table, layer, bool) {
        if( !animating ) {
            layer.toggleClass('is-visible', bool);
            animateForm(table, bool);
            table.toggleClass('selected-table', bool);
        }
    }

    function animateForm(table, animationType) {
        animating = true;

        var tableWidth = table.width(),
        tableHeight = table.height(),
        tableTop = table.offset().top - $(window).scrollTop(),
        tableLeft = table.offset().left,
        form = $('.cd-form'),
        formPlan = form.find('.cd-plan-info'),
        formFinalWidth = formWidth(),
        formFinalHeight = formHeight(),
        formTopValue = formTop(formFinalHeight),
        formLeftValue = formLeft(formFinalWidth),
        formTranslateY = tableTop - formTopValue,
        formTranslateX = tableLeft - formLeftValue,
        windowWidth = $(window).width(),
        windowHeight = $(window).height();

        if( animationType ) {//open the form
            //set the proper content for the .cd-plan-info inside the form
            formPlan.html(table.html());

            //animate plan info inside the form - set initial width and hight - then animate them to their final values
            formPlan.velocity(
            {
                'width': tableWidth+'px',
                'height': tableHeight+'px',
            }, 50, function(){
                formPlan.velocity(
                {
                    'width': tableFinalWidth+'px',
                    'height': tableFinalHeight+'px',
                }, animationDuration, [ 220, 20 ]);
            });

            //animate popout form - set initial width, hight and position - then animate them to their final values
            form.velocity(
            {
                'width': tableWidth+'px',
                'height': tableHeight+'px',
                'top': formTopValue,
                'left': formLeftValue,
                'translateX': formTranslateX+'px',
                'translateY': formTranslateY+'px',
                'opacity': 1,
            }, 50, function(){
                table.addClass('empty-box');

                form.velocity(
                {
                    'width': formFinalWidth+'px',
                    'height': formFinalHeight+'px',
                    'translateX': 0,
                    'translateY': 0,
                }, animationDuration, [ 220, 20 ], function(){
                    animating = false;
                    setTimeout(function(){
                        form.children('form').addClass('is-scrollable');
                    }, 300);
                }).addClass('is-visible');

            });
        } else {//close the form
            form.children('form').removeClass('is-scrollable');

            //animate plan info inside the form to its final dimension
            formPlan.velocity(
            {
                'width': tableWidth+'px',
            }, {
                duration: backAnimationDuration,
                easing: "easeOutCubic",
                delay: delay
            });

            //animate form to its final dimention/position
            form.velocity(
            {
                'width': tableWidth+'px',
                'height': tableHeight+'px',
                'translateX': formTranslateX+'px',
                'translateY': formTranslateY+'px',
            }, {
                duration: backAnimationDuration,
                easing: "easeOutCubic",
                delay: delay,
                complete: function(){
                    table.removeClass('empty-box');
                    form.velocity({
                        'translateX': 0,
                        'translateY': 0,
                        'opacity' : 0,
                    }, 0).find('form').scrollTop(0);
                    animating = false;
                }
            }).removeClass('is-visible');

            //target browsers not supporting transitions
            if($('.no-csstransitions').length > 0 ) table.removeClass('empty-box');
        }
    }

    function checkWindowWidth() {
        var mq = window.getComputedStyle(document.querySelector('.cd-form'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, '');
        return mq;
    }

    // function updateForm() {
    //     var device = checkWindowWidth(),
    //     form = $('.cd-form');
    //     tableFinalWidth = ( device == 'mobile') ? $(window).width()*0.9 : 210;
    //     tableFinalHeight = ( device == 'mobile' ) ? 93 : 255;

    //     if(form.hasClass('is-visible')) {
    //         var formFinalWidth = formWidth(),
    //         formFinalHeight = formHeight(),
    //         formTopValue = formTop(formFinalHeight),
    //         formLeftValue = formLeft(formFinalWidth);

    //         form.velocity(
    //         {
    //             'width': formFinalWidth,
    //             'height': formFinalHeight,
    //             'top': formTopValue,
    //             'left': formLeftValue,
    //         }, 0).find('.cd-plan-info').velocity(
    //         {
    //             'width': tableFinalWidth+'px',
    //             'height': tableFinalHeight+'px',
    //         }, 0);
    //     }
    // }

    //evaluate form dimention/position
    function formWidth() {
        return ( formMaxWidth <= $(window).width()*0.9) ? formMaxWidth : $(window).width()*0.9;
    }
    function formHeight() {
        return ( formMaxHeight <= $(window).height()*0.9) ? formMaxHeight : $(window).height()*0.9;
    }
    function formTop(formHeight) {
        return ($(window).height() - formHeight)/2;
    }
    function formLeft(formWidth) {
        return ($(window).width() - formWidth)/2;
    }

});

//# sourceMappingURL=app.js.map