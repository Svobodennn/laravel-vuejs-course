<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\User;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', function(Request $request) {
    return User::all();
});