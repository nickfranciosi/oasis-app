
@if (isset($user) && Auth::check())
@if ($user->facebook_user_id == Auth::user()->facebook_user_id)<a href="#" id="fb-share">Share on Facebook</a>
<a href="https://twitter.com/share" class="twitter-share-button" data-text="Oasis Awareness Campaign" data-via="oasis" data-size="large" data-count="none" data-hashtags="oasis">Tweet</a>
<a href="/{{ $user->image_path }}" id="downloadLink" download>Download</a>
@endif
@endif