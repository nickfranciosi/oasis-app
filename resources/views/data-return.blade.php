@extends('layouts.default')


@section('content')
    <div>
        <img src="https://graph.facebook.com/{{$user->facebook_user_id}}/picture??width=500&height=500">
    </div>
    @foreach ($response['data'] as $image) 

        <img style="max-width: 150px;" src="{{$image['images'][0]['source']}}" >
         
    @endforeach

    <a href="{{$response['paging']['next']}}">Load More</a>

@stop 


@section('scripts')


@stop