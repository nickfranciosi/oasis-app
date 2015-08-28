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
    <a href="https://www.facebook.com/dialog/share?
  app_id=145634995501895
  &display=popup
  &href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F
  &redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer">try this</a>
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

              FB.ui({
                method: 'share',
                link: 'https://developers.facebook.com/docs/',
                caption: 'An example caption',
              }, function(response){});
        </script>

        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
        
      

@stop