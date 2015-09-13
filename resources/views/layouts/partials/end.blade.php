
<script src="/js/libs.js"></script>
<script src="/js/app.js"></script><script type="text/javascript">

   
    $(function(){
        $(document).delegate('#fbTest','click',function(event){
            event.preventDefault();
            console.log('fb share');
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