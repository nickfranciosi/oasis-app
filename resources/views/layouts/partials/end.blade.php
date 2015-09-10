
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

          
        });
    });




    //Twitter Share
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
    
</script>