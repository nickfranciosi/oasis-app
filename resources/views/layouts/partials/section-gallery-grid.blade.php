
<section class="gallery-grid container-fluid">
  <h2 class="header text-center">Photo Gallery</h2>
  <div class="row">@foreach ($allUsers as $currentUser)
    <div class="col-xs-6 col-sm-4"><img src="/{{ $currentUser['image_path'] }}" class="img-max"/></div>@endforeach
  </div>
  <div class="view-more"><a href="/gallery" class="btn btn-main">View More Pictures</a><a href="/picture" class="btn btn-main">Create Your Own</a>@if (Auth::check())<a href="/profile/{{$user['facebook_user_id']}}" class="btn btn-main">View Your Profile</a>@endif</div>
</section>