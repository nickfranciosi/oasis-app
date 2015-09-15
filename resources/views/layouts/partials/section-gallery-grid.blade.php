
<section class="gallery-grid">
  <div class="container">
    <h2 class="header text-center">The others</h2>
    <div class="row">@foreach ($allUsers as $currentUser)
      <div class="col-xs-6 col-sm-4"><a href="/profile/{{$currentUser['facebook_user_id']}}"><img src="/{{ $currentUser['image_path'] }}" class="img-max"/></a></div>@endforeach
      <!-- TEMP-->
      <div class="col-xs-6 col-sm-4"><a href="/profile/{{$currentUser['facebook_user_id']}}"><img src="/img/gal1.png" class="img-max"/></a></div>
      <div class="col-xs-6 col-sm-4"><a href="/profile/{{$currentUser['facebook_user_id']}}"><img src="/img/gal2.png" class="img-max"/></a></div>
      <div class="col-xs-6 col-sm-4"><a href="/profile/{{$currentUser['facebook_user_id']}}"><img src="/img/gal3.png" class="img-max"/></a></div>
      <div class="col-xs-6 col-sm-4"><a href="/profile/{{$currentUser['facebook_user_id']}}"><img src="/img/gal4.png" class="img-max"/></a></div>
      <div class="col-xs-6 col-sm-4"><a href="/profile/{{$currentUser['facebook_user_id']}}"><img src="/img/gal5.png" class="img-max"/></a></div>
      <div class="col-xs-6 col-sm-4"><a href="/profile/{{$currentUser['facebook_user_id']}}"><img src="/img/gal2.png" class="img-max"/></a></div>
      <div class="col-xs-6 col-sm-4"><a href="/profile/{{$currentUser['facebook_user_id']}}"><img src="/img/gal3.png" class="img-max"/></a></div>
      <div class="col-xs-6 col-sm-4"><a href="/profile/{{$currentUser['facebook_user_id']}}"><img src="/img/gal4.png" class="img-max"/></a></div>
    </div>
    <div class="view-more"><a href="/gallery" class="btn btn-main">View More Pictures</a></div>
  </div>
</section>