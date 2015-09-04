<?php
use Illuminate\Http\Request;
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

// Create picture
Route::get('/', 'PagesController@showIndex');
Route::get('picture', 'PagesController@showPictureCreator');

Route::get('build', 'ImageBuildController@build');
Route::post('build', 'ImageBuildController@proccessImage');

Route::get('gallery', 'PagesController@showGallery');
Route::get('gallery/{id}', 'PagesController@showStory');

// Profile page
Route::get('profile', function(){
	return view('profile');
});

Route::post('/login', 'LoginController@login');
Route::get('/logout', 'LoginController@logout');

Route::get('users', function(){
    return App\User::all();
});

