var elixir = require('laravel-elixir');
require('laravel-elixir-jade');
require('laravel-elixir-imagemin');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

 elixir(function(mix) {

    mix.styles([
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/animate.css/animate.min.css'
    ], 'public/css/libs.css')
    .sass('main.scss')
    .scripts([
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/wow/dist/wow.min.js',
        './bower_components/velocity/velocity.min.js',
        './bower_components/jquery.steps/build/jquery.steps.min.js',
        'colorPicker.js',
        'imageBuilder.js'], 'public/js/libs.js')
    .scripts(['fb.js','app.js'], 'public/js/app.js')
    .jade({
        search: '**/*.jade',
        src: '/jade/'
    })
    .imagemin("./resources/assets/img", "./public/img");

});
