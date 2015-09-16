
@if (isset($user) && Auth::check())
@if ($user->facebook_user_id == Auth::user()->facebook_user_id)
<div class="share-block">
  <h3 class="sub-header">Share Your Photo</h3><a href="https://www.facebook.com/dialog/share?app_id=1467629810225761&href=http://oasis-app.xyz/profile/{!! $user->facebook_user_id !!}&display=popup&picture=http://oasis-app.xyz/{!! $user->image_path !!}&redirect_uri=http://oasis-app.xyz/profile/{!! $user->facebook_user_id !!}" alt="Facebook"><i class="fa fa-facebook"></i></a>
  <a href="https://twitter.com/share"  data-text="Oasis Awareness Campaign" data-via="oasis" data-size="large" data-count="none" data-hashtags="oasis" alt="Twitter"><i class="fa fa-twitter"></i></a>
  <a href="/{{ $user->image_path }}" id="downloadLink" download="{{ str_slug($user->name)}}.png" alt="Download"><i class="fa fa-download"></i></a>
</div>@endif
@endif
@unless (Auth::check())
<div class="share-block"><a href="/picture" class="btn btn-main">Create Your Own Picture</a></div>@endunless