<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="description" content="">
        <meta name="Keywords" content="">
        <meta name="format-detection" content="telephone=no,email=no" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Promiseth</title>
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        <script src="https://js.pusher.com/7.2/pusher.min.js"></script>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>