<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use App\User;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use SammyK\LaravelFacebookSdk\LaravelFacebookSdk;

class LoginController extends Controller
{

    public function login(Request $request)
    {
       $user =  User::where('facebook_user_id', $request->input('facebook_user_id'))->first();
       if(!$user){
           $user = User::create($request->all());
       }
       Auth::login($user);

       echo $user->facebook_user_id;
   }


   public function logout()
   {
        if (Auth::check()) {
           Auth::logout();
       }

    }
}
