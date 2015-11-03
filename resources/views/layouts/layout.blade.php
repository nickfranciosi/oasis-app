<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="description" content="Oasis Center is here to help at-risk youths navigate tricky waters of the teenage years with a wide range of programs that are designed to empower them and make them aware of their potential.">
    <meta itemprop="name" content="There's more to youth">
    <meta itemprop="description" content="Oasis Center is here to help at-risk youths navigate tricky waters of the teenage years with a wide range of programs that are designed to empower them and make them aware of their potential.">
    <!-- Twitter-->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@moretoyouth">
    <meta name="twitter:title" content="There's more to youth">
    <meta name="twitter:url" content="http://www.moretoyouth.com">
    <meta name="twitter:description" content="Oasis is here to help at-risk youths navigate tricky waters of the teenage years with a wide range of programs that are designed to empower them and make them aware of their potential.">
    <meta name="twitter:image" content="http://placehold.it/1600x640">
    <!-- Opengraph-->
    <meta property="og:title" content="Oasis Center - There's More to Youth">@if(isset($user))
    <meta property='og:url' content='http://moretoyouth.com/profile/{!! $user->facebook_user_id !!}' >
    <meta property='og:image' content='http://moretoyouth.com/{!! $user->image_path !!}'>
@else
    <meta property='og:url' content='http://moretoyouth.com' >
    <meta property='og:image' content='http://moretoyouth.com'>
@endif
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Oasis Center - There's More to Youth">
    <meta property="og:description" content="Oasis encourages people to show their disapproval for teen stereotypes. Help us take a stand by turning your existing Facebook profile picture into your own customized campaign photo.">
    <meta property="og:locale" content="en_US">
    <!-- Favicons (created with http://realfavicongenerator.net/)-->
    <link rel="apple-touch-icon" sizes="57x57" href="/img/favicons/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/img/favicons/apple-touch-icon-60x60.png">
    <link rel="icon" type="image/png" href="/img/favicons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/img/favicons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/img/favicons/manifest.json">
    <link rel="shortcut icon" href=" /img/favicons/favicon.ico">
    <meta name="msapplication-TileColor" content="#00a8ff">
    <meta name="msapplication-config" content="/img/favicons/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">
    <!-- Stylesheets-->
    <link rel="stylesheet" href="/css/libs.css">
    <link rel="stylesheet" type="text/css" href="/fonts/font-awesome-4.1.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/css/main.css">
    <!-- Typekit-->
    <script src="https://use.typekit.net/gro7xnj.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>
    <!--set global token for ajax requests-->
    <script>var _globalObj = {!! json_encode(array('_token'=> csrf_token(), '_facebook_app_id'=> env('FACEBOOK_APP_ID'), '_root_url' => env('ROOT_URL'), '_login_status' => false)) !!}</script>
  </head>
  <body>
    <!-- Preloader-->
    <div class="preloader">
      <div class="loader"></div>
    </div>
    <form id="canvasForm" method="post" action="/build" style="display: none;">
      <input name="first" value="Dork">
      <input name="second" value="Determined">
      <input name="color" value="#2ecc71">
      <input name="_token" id="hiddenToken" value="">
      <input name="profileImage" id="profileImage" value="">
      <input type="hidden" name="updatedImage" id="updated-image" value="">
      <input type="submit">
    </form>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-8">
            <p>2015 All Rights Reserves | <a href="http://oasescenter.org">Oasis Center </a> More to Youth</p>
          </div>
          <div class="col-sm-4"></div>
        </div>
      </div>
    </footer>
    <script src="/js/libs.js"></script>
    <script src="/js/app.js"></script><script type="text/javascript">


    $(function(){
        $('#fb-profile-share').on('click', function(e){
          e.preventDefault();
          console.log('time to share');

          var userImagePath = '';
          var userURL = _globalObj._root_url;
          @if(isset($user))
              userImagePath = '{!! $user->image_path !!}';
              userURL += 'profile/{!! $user->facebook_user_id !!}';
          @endif
          console.log(_globalObj._root_url + userImagePath);

          if( navigator.userAgent.match('CriOS') ){
            window.open( 'https://www.facebook.com/dialog/share?app_id='+_globalObj._facebook_app_id+'&href=http://oasis-app.xyz/'+userURL+'&display=popup&picture=http://oasis-app.xyz/'+userImagePath+'&redirect_uri=http://oasis-app.xyz/'+userURL," ", "status = 1, height = 500, width = 360, resizable = 0" );
          }else{
            FB.ui({
                method: 'share',
                link: userURL,
                caption: 'Oasis',
                href: userURL,
                picture: _globalObj._root_url + userImagePath
            }, function(response){});
          }

        });
    });




    //Twitter Share
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

</script>

<div id="fb-root"></div>
<script>(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
  </body>
</html>