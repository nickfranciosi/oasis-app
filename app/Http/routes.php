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

//Save Profile Photo
Route::post('save-profile', 'ImageBuildController@saveProfileImage');

// Create picture
Route::get('/', 'PagesController@showIndex');
Route::get('picture', 'PagesController@showPictureCreator');

// Route::get('build', 'ImageBuildController@build');
Route::post('build', 'ImageBuildController@proccessImage');

// Profile page
Route::get('profile/{fbID}', 'PagesController@showProfile');

//Gallery page
Route::get('gallery', 'PagesController@showGallery');

// Login routes
Route::post('/login', 'LoginController@login');
Route::get('/logout', 'LoginController@logout');

//Delete User
Route::get('delete', 'LoginController@delete');

Route::get('users', function(){
    return App\User::all();
});

