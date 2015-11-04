  $(function() {

    var validWords = ['aggressive','airhead','aloof','angry','athlete','bad attitude','bitch','bully','cocky','creep','depressed','desperate','dork','drunk','freak','geek','goody-two-shoes','hater','hyper','jock','junkie','loner','loser','loudmouth','meathead','misfit','nerd','outcast','player','preppy','prissy','privileged','punk','reckless','redneck','reject','runaway','selfish','snitch','snob','spoiled','stoner','stuck-up','thief','thug','troubled','wallflower','wannabe','weirdo','wild','adventuresome','alienated','ambitious','bored','brave','conflicted','creative','curious','determined','distracted','distraught','dreamer','driven','enthusiastic','entrepreneur','expressive','fragile','gifted','hungry','idealistic','immature','insecure','intense','introverted','lucky','misunderstood','naïve','needing acceptance','overwhelmed','passionate','persistent','positive','resilient','scared','sensitive','shy','spirited','survivor','talented','thoughtful','unchallenged','well-meaning','young'];

    $('#canvasForm').on('submit',function(e){
      e.preventDefault();

      // Initiate loading gif
      $('.preloader').removeClass('fadeOut').fadeIn('fast');

      console.log('in the form submit');
      var canvas,
      context,
      imageObj = new Image();

      var $form         = $(this);
      var imagePath     = this.profileImage.value;
      var firstWord     = this.first.value.toUpperCase();
      var secondWord    = this.second.value.toUpperCase();
      var boxColor      = this.color.value;
      var $updatedImage = $('#updated-image');
      var fontSettings  = '95px league-gothic';

      firstWord = validateWord(firstWord);
      secondWord = validateWord(secondWord);

      //determines how far down the image/canvas to place the words and colorbox
      var overlayPlacementModifier = 3.9;



      initiateCanvas();

      imageObj.onload = function() {

        setDimensionsOfCanvasToImageSize(this);
        convertTograyScale();
        addGradient();
        drawOverlayBox(this);
        setUpFont(fontSettings, '#222');

        var firstWidth = getTextWidth(firstWord);
        addWordToCanvas(firstWord, firstWidth, this);

        context.save();
        setUpFont(fontSettings, 'white');
        var secondWidth = getTextWidth(secondWord);
        flipText();
        addWordToCanvas(secondWord, secondWidth, this, true);
        context.restore();

        updateImgToUserGeneratedImage();
        deleteStepsCookie();
        sendAjaxRequest($form.serialize());

        
      };

      function flipText(){
        context.rotate(Math.PI);
      }

      function initiateCanvas(){
        canvas = document.createElement("canvas");
        context = canvas.getContext('2d');
        imageObj = new Image();
        // imageObj.crossOrigin = "Anonymous";
        imageObj.crossOrigin = "";

        //fires imgObj.onload
        imageObj.src = imagePath;
        console.log(imageObj);
      }

      function setDimensionsOfCanvasToImageSize(imgRef)
      {
        canvas.width = 500;
        canvas.height = 500;
        context.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
      }

      function drawOverlayBox(imgRef){
        context.save();
        context.globalAlpha = 0.5;
        context.fillStyle = boxColor;
        var intendedBoxPosition = canvas.height / overlayPlacementModifier;
        context.fillRect(0, canvas.height - intendedBoxPosition, canvas.width, canvas.height / 2);
        context.restore();
      }


      function addGradient(){
        var grd=context.createLinearGradient(0,canvas.width,0,0);
        grd.addColorStop(0,'rgba(255,255,255,1)');
        grd.addColorStop(0.3,'rgba(255,255,255,.5)');
        grd.addColorStop(0.4,'rgba(255,255,255,.3)');
        grd.addColorStop(0.5,'rgba(255,255,255,0)');
        // grd.addColorStop(0.35,"transparent");
        grd.addColorStop(1,"transparent");


        context.fillStyle=grd;
        context.fillRect(0,0,canvas.width,canvas.height - canvas.height / overlayPlacementModifier);
      }

      function setUpFont(fontFace, color){
        context.font = fontFace;
        context.fillStyle = color;
      }

      function getTextWidth(word){
        return context.measureText(word).width;
      }

      function addWordToCanvas(word, wordWidth, imgRef, reverse){
        reverse = typeof reverse !== 'undefined' ? reverse : false;
        var intendedWordPosition = canvas.height / overlayPlacementModifier;
        if(reverse){
          context.fillText(word, -(canvas.width + wordWidth) / 2, -(canvas.height - intendedWordPosition));
        }else{
          context.fillText(word, (canvas.width - wordWidth) / 2, canvas.height - intendedWordPosition);
        }
      }

      function updateImgToUserGeneratedImage(){
        var imageData = canvas.toDataURL();
        $updatedImage.val(imageData);
      }

      function convertTograyScale() {
        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels  = imgData.data;
        for (var i = 0, n = pixels.length; i < n; i += 4) {
          var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
            pixels[i  ] = grayscale;        // red
            pixels[i+1] = grayscale;        // green
            pixels[i+2] = grayscale;        // blue
            //pixels[i+3]              is alpha
          }
        //redraw the image in black & white
        context.putImageData(imgData, 0, 0);
      }


      function sendAjaxRequest(data){
        $.ajax({
          type: 'POST',
          url: $form.attr('action'),
          data: data,
          dataType: 'text',
          success:function(data){
            window.location.href = "profile/" + data;
          },
          error:function(){
            // failed request; give feedback to user
            console.log("error data");
          }
        });
      }

      function deleteStepsCookie(){
        $.cookie('jQu3ry_5teps_St@te_picture-steps', 0);
      }

      function validateWord(word){
        if(validWords.indexOf(word.toLowerCase()) !== -1 ){
          console.log('good');
          return word;
        }

        return "Dork";
      }

    });



});
