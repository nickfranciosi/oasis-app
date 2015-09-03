// Step process
// https://github.com/rstaib/jquery-steps
$("#picture-steps").steps({
  headerTag: "h2.sr-only",
  bodyTag: "section",
  transitionEffect: "fade",
  autoFocus: true
})




// Color picker
// http://www.bamdaa.com/demo/color-picker/
$(".cp-fullscreen").colorPicker({
	// get colors from json
	colors: 'colors.json',

	// fill background overlay
  onSelect: function(ui, color){
    $('.color-overlay').css('background-color', color);
    console.log(color);
  }
});




// Select sections
var sectionHalf = $('#picture-steps-p-0 .step-half'),
    sectionTop  = $('.step-top'),
    sectionBottom = $('.step-bottom'),
    sectionList = $('.step-list'),
    selectedWordSpan = $(''),
    selectedWord = $('.step-list ul > li > a');





sectionHalf.on('click', function() {

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
    console.log('bottom is open');
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
  	.replaceWith('<span class="selected-word color-accent animated flipInX">' + selectedText + '</span>');

  // Update the words on the picture screen
  if (closestStep.hasClass('step-top')) {
  	pictureWordFirst.text(selectedText);
  } else {
  	pictureWordLast.text(selectedText);
  }

});




// Window Load
$(window).on('load', function() {

  // Preloader
  $('.preloader').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    $('.preloader').hide();
    $('.intro-tables').addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
  });


  // Dynamic height of cut thing
  $('#intro').height($(window).height() - 80);
  $('section .cut').each(function() {
    if ($(this).hasClass('cut-top'))
      $(this).css('border-right-width', $(this).parent().width() + "px");
    else if ($(this).hasClass('cut-bottom'))
      $(this).css('border-left-width', $(this).parent().width() + "px");
  });

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

    function updateForm() {
        var device = checkWindowWidth(),
            form = $('.cd-form');
        tableFinalWidth = ( device == 'mobile') ? $(window).width()*0.9 : 210;
        tableFinalHeight = ( device == 'mobile' ) ? 93 : 255;

        if(form.hasClass('is-visible')) {
            var formFinalWidth = formWidth(),
                formFinalHeight = formHeight(),
                formTopValue = formTop(formFinalHeight),
                formLeftValue = formLeft(formFinalWidth);

            form.velocity(
            {
                'width': formFinalWidth,
                'height': formFinalHeight,
                'top': formTopValue,
                'left': formLeftValue,
            }, 0).find('.cd-plan-info').velocity(
            {
                'width': tableFinalWidth+'px',
                'height': tableFinalHeight+'px',
            }, 0);
        }
    }

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

;