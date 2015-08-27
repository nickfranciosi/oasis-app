<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use SammyK\LaravelFacebookSdk\LaravelFacebookSdk;

class LoginController extends Controller
{
    protected $fb;

    public function __construct(LaravelFacebookSdk $fb)
    {
        $this->fb = $fb;
    }
    public function login(){
        // Send an array of permissions to request
        $login_url = $this->fb->getLoginUrl(['email', 'user_photos']);

        // Obviously you'd do this in blade :)
       

        return view('pages.login')->with(compact('login_url'));
    }
}
