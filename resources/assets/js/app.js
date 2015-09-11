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
    sectionTop     = $('#picture-steps-p-0 .step-top'),
    sectionBottom  = $('#picture-steps-p-0 .step-bottom'),

    sectionList    = $('.step-list'),
    selectedWord   = $('.step-list ul > li > a');


sectionHalf.on('click', function() {

	function toTop() {
	  sectionHalf.animate({
	    scrollTop: sectionHalf.offset().top - 100
	  }, 200);
	}

  // When section is open
  if ( $(this).hasClass('is-open') ) {

  	// Remove classes and go to top
    $(this).removeClass('is-open').addClass('collapsed');
    toTop();

  } else {
    $(this).addClass('is-open').removeClass('collapsed');
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




// Load
$(window).on('load', function() {

  if($.cookie('first_word') != undefined){
    console.log('we have a cookie set');
    if($('#picture-steps').steps('getCurrentIndex') == 1){
      $('#picture-steps').steps('next');  
    }
    setWordsOnImageFromCookie($.cookie('first_word'), $.cookie('second_word'));
  }
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
