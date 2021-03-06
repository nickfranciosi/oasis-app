@extends('layouts.default')




@section('content')
    <h2>Single Story</h2>

    <img id="mainImage" src="/{{ $user->image_path }}">

    <div id="fb-root"></div>
    
    @include('partials.shareButtons')
    
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

              $('#fbTest').on('click',function(){
              FB.ui({
                method: 'share',
                link: 'https://developers.facebook.com/docs/',
                caption: 'A new Caption',
                href: 'http://oasis-app.xyz',
                picture: 'http://oasis-app.xyz/{{ $user->image_path }}'
              }, function(response){});

              });

        </script>

        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
        
      

@stop