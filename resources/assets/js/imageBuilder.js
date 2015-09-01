  $(function() {

    $('#canvasForm').on('submit',function(e){
      e.preventDefault();

      var canvas,
      context,
      imageObj = new Image();

      var $form         = $(this);
      var imagePath     = this.imgPath.value;
      var firstWord     = this.first.value.toUpperCase();
      var secondWord    = this.second.value.toUpperCase();
      var boxColor      = this.color.value;
      var $targetImage  = $('#targetImage');
      var $updatedImage = $('#updated-image');

      //determines how far down the image/canvas to place the words and colorbox
      var overlayPlacementModifier = 3;

      

      initiateCanvas();

      imageObj.onload = function() {

        setDimensionsOfCanvasToImageSize(this);
        convertTograyScale();
        drawOverlayBox(this);
        setUpFont('160px league-gothic', 'white');

        var firstWidth = getTextWidth(firstWord);
        addWordToCanvas(firstWord, firstWidth, this);

        context.save();
        var secondWidth = getTextWidth(secondWord);
        flipText();
        addWordToCanvas(secondWord, secondWidth, this, true);
        context.restore();

        updateImgToUserGeneratedImage();

        sendAjaxRequest($form.serialize());
      };  

      function flipText(){
        context.rotate(Math.PI);
      }

      function initiateCanvas(){
        canvas = document.createElement("canvas");
        context = canvas.getContext('2d');
        imageObj = new Image();
        imageObj.crossOrigin = "Anonymous";

        //fires imgObj.onload
        imageObj.src = imagePath;
      }  

      function setDimensionsOfCanvasToImageSize(imgRef)
      {
        canvas.width = imgRef.width;
        canvas.height = imgRef.height;
        context.drawImage(imageObj, 0, 0);
      }

      function drawOverlayBox(imgRef){
        context.save();
        context.globalAlpha = 0.5;
        context.fillStyle = boxColor;
        var intendedBoxPosition = imgRef.height / overlayPlacementModifier;
        context.fillRect(0, imgRef.height - intendedBoxPosition, imgRef.width, imgRef.height / 2);
        context.restore();
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
        var intendedWordPosition = imgRef.height / overlayPlacementModifier;
        if(reverse){
          context.fillText(word, -(imgRef.width + wordWidth) / 2, -(imgRef.height - intendedWordPosition + 5));
        }else{
          context.fillText(word, (imgRef.width - wordWidth) / 2, imgRef.height - intendedWordPosition - 5);  
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
            setTimeout(function(){
              window.location.href = "gallery";
            }, 500)
          },
          error:function(){
            // failed request; give feedback to user
            console.log("error data");
          }
        });
      }

    });



});
