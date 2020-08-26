<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  class="h-100">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="author" content="cerw">
        <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      <meta name="format-detection" content="telephone=no"/>
        
{{-- Icon --}}
<link rel="apple-touch-icon" sizes="72x72" href="/images/icons/icon-72x72.png">
<link rel="apple-touch-icon" sizes="96x96" href="/images/icons/icon-96x96.png">
<link rel="apple-touch-icon" sizes="512x512" href="/images/icons/icon-512x512.png">
<link rel="icon" type="image/png" sizes="512x512"  href="/images/icons/icon-512x512.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/images/icons/icon-192x192.png">
<link rel="icon" type="image/png" sizes="96x96" href="/images/icons/icon-96x96.png">
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#000000">
<meta name="msapplication-TileImage" content="/images/icons/icon-512x512.png">
<meta name="theme-color" content="#f20000">

  <!-- CSRF Token -->


  <title>{{ config('app.name', '') }} {{ $title ?? '' }}</title>


<!-- Global site tag (gtag.js) - Google Analytics -->
@if(App::environment('production','local'))
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-174008818-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-174008818-1');
  console.log('%c This is Radio1 TImemachine', 'font-size: 14px; color: #fff; background-color: #ed1c2e;')
</script>
@endif


    <!-- Styles -->
  <link href="{{ mix('css/app.css') }}" rel="stylesheet">
  @yield('style')
</head>
    


  <body class="d-flex flex-column h-100">
    <!-- Begin page content -->
    
   <div id="app">
   </div>


    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/app.js') }}"></script>
    @yield('scripts')
    </body>
</html>
