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
      console.log($(this).text());
      $('#canvasForm input[name="first"]').val($(this).text());
      $.cookie('first_word', $(this).text());
  });

  $('#negative-list  li > a').on('click', function(e){
      e.preventDefault();
      console.log($(this).text());
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
	// http://www.bamdaa.com/demo/color-picker/
	$(".cp-fullscreen").colorPicker({
		// Get colors from json
		colors: 'colors.json',

		// Fill background overlay
	  onSelect: function(ui, color){
	    $('.color-overlay').css('background-color', color);
	    console.log(color);

	    // Add to the form
	    $('#canvasForm input[name="color"]').val(color);
	  }
	});




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
    console.log('we have a cookie set');
    if($('#picture-steps').length){
          if($('#picture-steps').steps('getCurrentIndex') == 1){
                setTimeout(function(){
                  $('#picture-steps').steps('next');
                }, 500);
          }
     }
    setWordsOnImageFromCookie($.cookie('first_word'), $.cookie('second_word'));
  }

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


