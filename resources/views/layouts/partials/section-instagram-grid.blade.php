
<section class="instragram-grid">
  <div class="container">
    <h2 class="header text-center">Instagram</h2>
    <div class="row">@foreach ($allUsers as $currentUser)
      <div class="col-sm-4"><a href="/profile/{{$currentUser['facebook_user_id']}}"><img src="/{{ $currentUser['image_path'] }}" class="img-max"/></a></div>@endforeach
    </div>
    <div class="view-more"><a class="btn btn-main">View More</a></div>
  </div>
</section>