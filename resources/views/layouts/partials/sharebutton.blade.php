
@if (isset($user) && Auth::check())
@if ($user->facebook_user_id == Auth::user()->facebook_user_id)
<button id="fbTest">Share on Facebook</button><a href="https://www.facebook.com/dialog/share?app_id=1467629810225761&amp;href=http://oasis-app.xyz/&amp;display=popup&amp;picture=http://oasis-app.xyz/{{$user-&gt;image_path}}&amp;redirect_uri=http://oasis-app.xyz/">test</a><a href="https://twitter.com/share" class="twitter-share-button" data-text="Oasis Awareness Campaign" data-via="oasis" data-size="large" data-count="none" data-hashtags="oasis">Tweet</a>
<a href="/{{ $user->image_path }}" id="downloadLink" download>Download</a>
@endif
@endif