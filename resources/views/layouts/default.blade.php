<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
   <meta property="og:title" content="This is the title for Oasis" />
   <meta property="og:type" content="website" />
   <meta property="og:site_name" content="Oasis Awareness Campaign"/>
   <meta property="og:url" content="http://oasis-app.xyz" />
   <meta property="og:description" content="This is the description of the awerness campaign.
   This needs to be at lest two sentences long and describe what the site is about." />
   <meta property="fb:app_id" content="1477990922522983" />
  
   
    <title>Oasis</title>

   <script src="https://use.typekit.net/gro7xnj.js"></script>
   <script>try{Typekit.load({ async: true });}catch(e){}</script>
</head>
<body>
    @include('partials.nav')

    @yield('content')
    
    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="/js/libs.js"></script>
    <script src="/js/app.js"></script>
    @yield('scripts')
    
</body>
</html>