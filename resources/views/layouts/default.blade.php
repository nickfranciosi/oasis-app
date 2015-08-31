<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
   <meta property="og:title" content="This is the title for Oasis" />
   <meta property="og:type" content="website" />
   <meta property="og:site_name" content="Oasis Awareness Campaign"/>
   <meta property="og:url" content="http://oasis.app:8000" />
   <meta property="og:description" content="This is the description of the awerness campaign.
   This needs to be at lest two sentences long and describe what the site is about." />
   <meta property="fb:app_id" content="{{ config('FACEBOOK_APP_ID') }}" />
   @if (isset($user))
    <meta property="og:image" content="/{{ $user->image_path }}" />
   @endif
   
    <title>Oasis</title>
</head>
<body>
    @include('partials.nav')
    @yield('content')
    @if (isset($user))
     {{ var_dump($user) }}
      {{ $user->image_path }}
    @endif


    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="/js/all.js"></script>
    @yield('scripts')
    
</body>
</html>