<?php

namespace App\Http\Controllers;

use Auth;
use Session;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use SammyK\LaravelFacebookSdk\LaravelFacebookSdk;

class PagesController extends Controller
{
    

    public function build(LaravelFacebookSdk $fb)
    {

        $user = Auth::user();
        $token = Session::get('fb_user_access_token');
        $fb->setDefaultAccessToken((string) $token);
        
        $response = $fb->get('/me/photos?fields=images')->getDecodedBody();

        return view('build')->with(compact('response', 'user'));

    }
}
