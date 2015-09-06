
<section class="instragram-grid">
  <div class="container">
    <h2 class="header text-center">Instagram</h2>
    <div class="row"></div>@foreach ($allUsers as $currentUser)
    <div class="col-sm-4"><img src="/{{ $currentUser['image_path'] }}" class="img-max"/></div>@endforeach
    <div class="view-more"><a class="btn-main veiw-more">View More</a></div>
  </div>
</section>