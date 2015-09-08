
//Facebook Share
$('#fbTest').on('click',function(){
    FB.ui({
      method: 'share',
      link: 'https://developers.facebook.com/docs/',
      caption: 'A new Caption',
      href: 'http://oasis-app.xyz',
      picture: 'http://oasis-app.xyz/{{ $user->image_path }}'
  }, function(response){});
});

//Twitter Share
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');