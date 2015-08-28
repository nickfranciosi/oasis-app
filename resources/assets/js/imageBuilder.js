  $(function() {

    $('#canvasForm').on('submit',function(e){
      e.preventDefault();

      var canvas,
      context,
      imageObj = new Image();

      var $form         = $(this);
      var imagePath     = this.imgPath.value;
      var firstWord     = this.first.value;
      var secondWord    = this.second.value;
      var boxColor      = this.color.value;
      var $targetImage  = $('#targetImage');
      var $updatedImage = $('#updated-image');

      

      initiateCanvas();

      imageObj.onload = function() {
        
        setDimensionsOfCanvasToImageSize(this);
        drawOverlayBox(this);
        setUpFont('40pt Arial', 'blue');

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
        context.globalAlpha = 0.4;
        context.fillStyle = boxColor;
        context.fillRect(0, imgRef.height / 2, imgRef.width, imgRef.height / 2);
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

        if(reverse){
          context.fillText(word, -(imgRef.width + wordWidth) / 2, -(imgRef.height / 2 + 10));
        }else{
          context.fillText(word, (imgRef.width - wordWidth) / 2, imgRef.height / 2 - 10);  
        }
      }

      function setGradient(){
        var gradient = context.createLinearGradient(0, 0, 0, canvas.height);

        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(1, 'rgba(255,255,255,1)');
        
      }

      function updateImgToUserGeneratedImage(){
        var imageData = canvas.toDataURL();
        $updatedImage.val(imageData);
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
