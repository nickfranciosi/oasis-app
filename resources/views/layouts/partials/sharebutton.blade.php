
@if (isset($user) && Auth::check())
@if ($user->facebook_user_id == Auth::user()->facebook_user_id)<a href="nothing" id="fb-profile-share">Test</a><a href="https://www.facebook.com/dialog/share?app_id=1467629810225761&href=http://oasis-app.xyz/profile/{!! $user->facebook_user_id !!}&display=popup&picture=http://oasis-app.xyz/{!! $user->image_path !!}&redirect_uri=http://oasis-app.xyz/profile/{!! $user->facebook_user_id !!}"> <i class="fa fa-facebook"></i></a>
<a href="https://twitter.com/share"  data-text="Oasis Awareness Campaign" data-via="oasis" data-size="large" data-count="none" data-hashtags="oasis"><i class="fa fa-twitter"></i></a>
<a href="/{{ $user->image_path }}" id="downloadLink" download="{{ str_slug($user->name)}}.png"><i class="fa fa-download"></i></a>
@endif
@endif