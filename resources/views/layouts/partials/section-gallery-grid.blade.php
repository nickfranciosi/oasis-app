
<section class="gallery-grid">
  <div class="container">
    <h2 class="header text-center">The others</h2>
    <div class="row">@foreach ($allUsers as $currentUser)
      <div class="col-xs-6 col-sm-4"><a href="/profile/{{$currentUser['facebook_user_id']}}"><img src="/{{ $currentUser['image_path'] }}" class="img-max"/></a></div>@endforeach
      <!-- TEMP-->
    </div>
    <div class="view-more"><a href="/gallery" class="btn btn-main">View More Pictures</a><a href="/picture" class="btn btn-main">Create Your Own</a></div>
  </div>
</section>