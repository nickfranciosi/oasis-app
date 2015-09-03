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
           echo " no user create one";
           $user = User::create($request->all());
       }else{
           echo " user exists update that guy";
           // $user->update($request->all());
       }
       Auth::login($user);
   }


   public function logout()
   {
        if (Auth::check()) {
           Auth::logout();
       }

    }
}
