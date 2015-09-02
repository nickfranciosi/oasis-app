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

    protected $fb;

    public function __construct(LaravelFacebookSdk $fb)
    {
        $this->fb = $fb;
    }
    

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
        return view('index');
    }

    public function showPictureCreator()
    {
        $login_url = $this->fb->getLoginUrl(['email', 'user_photos']);
        return view('picture')->with(compact('login_url'));
    }

    public function showGallery()
    {
        $users = User::all();

        return view('pages.gallery')->with(compact('users'));
    }

    public function showStory($id)
    {
        $user = User::where('facebook_user_id', $id)->firstOrFail();
        
        return view('pages.story')->with(compact('user'));
    }
}
