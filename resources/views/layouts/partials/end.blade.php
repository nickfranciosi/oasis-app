
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="/js/libs.js"></script>
<script src="/js/app.js"></script><script type="text/javascript">

   
    $(function(){
        $('#fbTest').on('click',function(){
            var userImagePath = '';
            @if(isset($user))
                userImagePath = '{!! $user->image_path !!}';
            @endif
            
            FB.ui({
              method: 'share',
              link: 'https://developers.facebook.com/docs/',
              caption: 'A new Caption',
              href: _globalObj._root_url,
              picture: _globalObj._root_url + userImagePath
          }, function(response){});
        });
    });
    
</script>