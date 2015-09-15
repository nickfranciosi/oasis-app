
@if (isset($user) && Auth::check())
@if ($user->facebook_user_id == Auth::user()->facebook_user_id)
<div class="btn-group"><a type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-main dropdown-toggle">Share<span class="caret"></span></a>
  <ul class="dropdown-menu">
    <li><a class="" href="https://www.facebook.com/dialog/share?app_id=1467629810225761&href=http://oasis-app.xyz/profile/{!! $user->facebook_user_id !!}&display=popup&picture=http://oasis-app.xyz/{!! $user->image_path !!}&redirect_uri=http://oasis-app.xyz/profile/{!! $user->facebook_user_id !!}"><i class="fa fa-facebook"></i> Facebook</a></li>
    <li><a class="" href="https://twitter.com/share"  data-text="Oasis Awareness Campaign" data-via="oasis" data-size="large" data-count="none" data-hashtags="oasis"><i class="fa fa-twitter"></i> Twitter</a></li>
    <li><a class="" href="/{{ $user->image_path }}" id="downloadLink" download="{{ str_slug($user->name)}}.png"><i class="fa fa-download"></i> Download </a></li>
    <li role="separator" class="divider"></li>
    <li><a id="delete-user" href="/delete">Remove My Picture</a></li>
  </ul>
</div>@endif
@endif