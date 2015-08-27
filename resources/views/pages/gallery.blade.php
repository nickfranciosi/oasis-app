@extends('layouts.default')



@section('content')
    <h2>Gallery Page</h2>    


    @foreach ($users as $user)
        <a href="/gallery/{{ $user->facebook_user_id }}"><img src="/{{$user->image_path}}"></a>
    @endforeach
@stop