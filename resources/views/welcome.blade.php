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
        

        <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', '') }} {{ $title ?? '' }}</title>


<!-- Global site tag (gtag.js) - Google Analytics -->
@if(App::environment('production'))
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
    <main role="main" class="flex-shrink-0">

        <div class="container">
            <div id="app">
            </div>
        </div>
    </main>

    <footer class="footer mt-auto py-3">
    <div class="container">
        <span class="text-muted">Time Machine for <a href="https://www.radio1.cz/">Radio 1</a></span>
    </div>
    </footer>


    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/app.js') }}"></script>
    @yield('scripts')
    </body>
</html>
