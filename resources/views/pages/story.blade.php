@extends('layouts.default')




@section('content')
    <h2>Single Story</h2>

    <img src="/{{ $user->image_path }}">

    <div id="fb-root"></div>
    {{-- <span class='st_facebook_large' displayText='Facebook'></span>
    <span class='st_twitter_large' displayText='Tweet'></span>
    <span class='st_email_large' displayText='Email'></span> --}}
    <div class="fb-share-button" 
        data-href="http://oasis-app.xyz/" >
    </div>
    <a href="https://twitter.com/share" class="twitter-share-button" data-text="Oasis Awareness Campaign" data-via="nickfranciosi" data-size="large" data-count="none" data-hashtags="oasis">Tweet</a>
    
@stop

@section('scripts')
    
        <script>
              window.fbAsyncInit = function() {
                FB.init({
                  appId      : '1477990922522983',
                  xfbml      : true,
                  version    : 'v2.4'
                });
              };

              (function(d, s, id){
                 var js, fjs = d.getElementsByTagName(s)[0];
                 if (d.getElementById(id)) {return;}
                 js = d.createElement(s); js.id = id;
                 js.src = "//connect.facebook.net/en_US/sdk.js";
                 fjs.parentNode.insertBefore(js, fjs);
               }(document, 'script', 'facebook-jssdk'));
        </script>

        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
        
        <!-- Your like button code -->
        <script type="text/javascript">var switchTo5x=true;</script>
        <script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
        <script type="text/javascript">stLight.options({publisher: "f91606b7-b3d8-43b6-9f8d-8a966e286647", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>

@stop