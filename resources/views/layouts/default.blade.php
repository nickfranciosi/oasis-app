<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Oasis</title>
</head>
<body>
    @include('partials.nav')
    @yield('content')



    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="/js/all.js"></script>
    @yield('scripts')
    
</body>
</html>