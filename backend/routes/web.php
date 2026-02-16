<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return response()->json([
        'message' => 'Blog API',
        'version' => '1.0.0',
        'endpoints' => [
            'GET /api/articles' => 'Get all articles',
            'GET /api/articles/{id}' => 'Get single article with comments',
            'POST /api/articles' => 'Create new article',
            'POST /api/articles/{id}/comments' => 'Add comment to article',
        ]
    ]);
});
