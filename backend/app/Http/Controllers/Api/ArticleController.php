<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the articles.
     */
    public function index(): JsonResponse
    {
        $articles = Article::latest()->get(['id', 'title', 'content', 'created_at']);
        
        return response()->json([
            'success' => true,
            'data' => $articles->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'excerpt' => $article->excerpt,
                    'created_at' => $article->created_at->format('Y-m-d H:i:s'),
                ];
            })
        ]);
    }

    /**
     * Display the specified article with comments.
     */
    public function show(int $id): JsonResponse
    {
        $article = Article::with('comments')->find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $article->id,
                'title' => $article->title,
                'content' => $article->content,
                'created_at' => $article->created_at->format('Y-m-d H:i:s'),
                'comments' => $article->comments->map(function ($comment) {
                    return [
                        'id' => $comment->id,
                        'author_name' => $comment->author_name,
                        'content' => $comment->content,
                        'created_at' => $comment->created_at->format('Y-m-d H:i:s'),
                    ];
                })
            ]
        ]);
    }

    /**
     * Store a newly created article in storage.
     */
    public function store(StoreArticleRequest $request): JsonResponse
    {
        $article = Article::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Article created successfully',
            'data' => [
                'id' => $article->id,
                'title' => $article->title,
                'content' => $article->content,
                'created_at' => $article->created_at->format('Y-m-d H:i:s'),
            ]
        ], 201);
    }

    /**
     * Store a newly created comment for the article.
     */
    public function storeComment(int $id, StoreCommentRequest $request): JsonResponse
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $comment = $article->comments()->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Comment added successfully',
            'data' => [
                'id' => $comment->id,
                'author_name' => $comment->author_name,
                'content' => $comment->content,
                'created_at' => $comment->created_at->format('Y-m-d H:i:s'),
            ]
        ], 201);
    }
}
