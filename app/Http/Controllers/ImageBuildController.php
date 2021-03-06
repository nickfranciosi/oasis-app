<?php

namespace App\Http\Controllers;

use Auth;
use Session;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use SammyK\LaravelFacebookSdk\LaravelFacebookSdk;

class ImageBuildController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function build(LaravelFacebookSdk $fb)
    {

       $user = Auth::user();
       $token = Session::get('fb_user_access_token');
       $fb->setDefaultAccessToken((string) $token);

       $response = $fb->get('/me/photos?fields=images')->getDecodedBody();

       return view('build')->with(compact('response', 'user'));

    }


    public function saveProfileImage(Request $request){
        $user = Auth::user();
        $url = $request->input('url');
        $imgPath = 'img/profile/'. $user->facebook_user_id .'.jpg';

        file_put_contents($imgPath, file_get_contents($url)) ? $repsonse = $imgPath : $response = "could not upload image";

        echo $repsonse;
    }   


    public function proccessImage(Request $request)
    {
        $data = $request->input('updatedImage');

        $data = $this->decodeImage($data);
        $user = Auth::user();

        //use facebook id and timestamp to prevent caching by facebook
        $filePath = $this->buildFilePath($user->facebook_user_id . '-' . strval(time()));
        $user->update(['image_path' => $filePath]);
        file_put_contents($filePath, $data);

        echo $user->facebook_user_id;

        return;
    }

    private function decodeImage($rawData)
    {
        return $decodedData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $rawData));
    }

    private function buildFilePath($fileName)
    {
       return $filePath = 'img/generated/' . $fileName . '.png';
    }
}
