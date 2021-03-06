<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\User;
use Auth;
use Illuminate\Http\Request;
use SammyK\LaravelFacebookSdk\LaravelFacebookSdk;
use Session;

class PagesController extends Controller
{

    public function build()
    {

        $user = Auth::user();
        $token = Session::get('fb_user_access_token');
        $this->fb->setDefaultAccessToken((string) $token);

        $response = $this->fb->get('/me/photos?fields=images')->getDecodedBody();

        return view('build')->with(compact('response', 'user'));

    }

    public function showIndex()
    {
        $user = Auth::user();
        $allUsers = User::whereNotNull('image_path')->take(6)->orderBy('updated_at', 'desc')->get();
        return view('index')->with(compact('allUsers'))->with(compact('user'));
    }

    public function showPictureCreator()
    {

        return view('picture');
    }

    public function showProfile($fbID)
    {
        $user = User::where('facebook_user_id', $fbID)->first();
        $allUsers = User::where('facebook_user_id', '!=', $user->facebook_user_id)->whereNotNull('image_path')->orderBy('updated_at', 'desc')->take(3)->get();
        return view('profile')->with(compact('user'))->with(compact('allUsers'));
    }

    public function showGallery()
    {   $user = Auth::user();
        $allUsers = User::whereNotNull('image_path')->orderBy('updated_at', 'desc')->get();

        return view('gallery')->with(compact('allUsers'))->with(compact('user'));
    }

    public function showStory($id)
    {
        $user = User::where('facebook_user_id', $id)->firstOrFail();

        return view('pages.story')->with(compact('user'));
    }
}
