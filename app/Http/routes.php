<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {

    return view('welcome');
});

Route::get('/users' ,function(){

    
});



Route::get('session-get', function(SammyK\LaravelFacebookSdk\LaravelFacebookSdk $fb){

    $user = Auth::user();



    $token = Session::get('fb_user_access_token');
    $fb->setDefaultAccessToken((string) $token);
    
    $response = $fb->get('/me/photos?fields=images')->getDecodedBody();
    // $response = $fb->get('/me/photos?fields=images');

    return view('data-return')->with(compact('response', 'user'));
});


require('routes/facebookLoginRoutes.php');