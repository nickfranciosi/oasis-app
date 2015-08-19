@extends('layouts.default')


@section('content')
    <div>
        <img id="main-image" style="max-width: 700px;" src="https://graph.facebook.com/{{$user->facebook_user_id}}/picture??width=500&height=500">
    </div>

    <form id="canvasForm">
      <label>First Word</label>
      <select name="first">
        <option value="Dork">Dork</option>
        <option value="Nerd">Nerd</option>
        <option value="Brat">Brat</option>
        <option value="Stupid">Stupid</option>
        <option value="Hungry">Hungry</option>
      </select>
      <label>Second Word</label>
      <select name="second">
        <option value="Determined">Determined</option>
        <option value="Brave">Brave</option>
        <option value="Go Getter">Go Getter</option>
        <option value="Leader">Leader</option>
        <option value="Hungry">Hungry</option>
      </select>
      <input type="hidden" name="imgPath" id="selected-image" value="https://graph.facebook.com/{{$user->facebook_user_id}}/picture??width=500&height=500">
      <label>Color</label>
      <input type="color" name="color">
      <input type="Submit" value="Submit">
    </form>

    <img src="" style="max-width: 700px;" id="targetImage">

    <div id="photo-gallery">
        @foreach ($response['data'] as $image) 

            <img style="max-width: 150px;" src="{{$image['images'][0]['source']}}" >
             
        @endforeach
    </div>
    <a href="{{$response['paging']['next']}}">Load More</a>

@stop 


@section('scripts')

<script>
$(function() {

    $('#photo-gallery img').on('click', function(e){
        e.preventDefault();
        console.log(this.src);
        $('#selected-image').val(this.src);
        $('#main-image').attr('src',this.src);

    });

    $('#canvasForm').on('submit',function(e){
      e.preventDefault();

    var imagePath = this.imgPath.value;
    var firstWord = this.first.value;
    var secondWord = this.second.value;
    var boxColor = this.color.value;


    var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.crossOrigin = "Anonymous";
    imageObj.src = imagePath;
    

    imageObj.onload = function() {
        canvas.width = this.width;
        canvas.height = this.height;
        context.drawImage(imageObj, 0, 0);
        
        // var gradient = context.createLinearGradient(0, 0, 0, canvas.height);

        // gradient.addColorStop(0, 'rgba(255,255,255,0)');
        // gradient.addColorStop(1, 'rgba(255,255,255,1)');
        context.save();
        context.globalAlpha = 0.4;
        context.fillStyle = boxColor;
        context.fillRect(0, this.height / 2, this.width, this.height / 2);
        context.restore();

        context.font = '40pt Arial';
        context.fillStyle = 'blue';

        var firstWidth = context.measureText(firstWord).width;
        context.fillText(firstWord, (this.width - firstWidth) / 2, this.height / 2 - 10);

        context.save();
        var secondWidth = context.measureText(secondWord).width;
        context.rotate(Math.PI);
        context.fillText(secondWord, -(this.width + secondWidth) / 2, -(this.height / 2 + 10));
        context.restore();

        console.log(canvas.toDataURL());

        var targetImage = document.getElementById('targetImage');
        targetImage.src = canvas.toDataURL();
    };


  });

});

</script>

@stop