
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="/js/libs.js"></script>
<script src="/js/app.js"></script><script type="text/javascript">

   
    $(function(){
        $('#fbTest').on('click',function(){
            var userImagePath = '';
            @if(isset($user))
                userImagePath = '{!! $user->image_path !!}';
            @endif
            console.log(_globalObj._root_url + userImagePath);
            FB.ui({
              method: 'share',
              link: _globalObj._root_url,
              caption: 'A newest Caption',
              href: _globalObj._root_url,
              picture: _globalObj._root_url + userImagePath
          }, function(response){});
        });

        $('#fbTest2').on('click', function(e){
          window.location = 'https://www.facebook.com/dialog/share?
  app_id=145634995501895
  &display=popup
  &href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F
  &redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer';
          
        });
    });




    //Twitter Share
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
    
</script>