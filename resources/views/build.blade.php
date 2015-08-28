@extends('layouts.default')


@section('content')
    <div>
        <img id="main-image" style="max-width: 700px;" src="https://graph.facebook.com/{{$user->facebook_user_id}}/picture??width=500&height=500">
    </div>

    <form id="canvasForm" method="post" action="/build" >

      {!!  csrf_field() !!}
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
      <input type="hidden" name="updatedImage" id="updated-image" value="">
      <label>Color</label>
      <input type="color" name="color">
      <input type="Submit" value="Submit">
    </form>

@stop 

@section('scripts')
  <script>
  //let user select image
  $('#photo-gallery img').on('click', function(e){
    e.preventDefault();
    $('#selected-image').val(this.src);
    $('#main-image').attr('src',this.src);
  });

  </script>
@stop
