<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class PresentationController extends Controller
{
    /**
     * Display the presentation view.
     */
    public function show()
    {   
        return Inertia::render('presentation');
    }
    
    /**
     * Get the presentation content
     */
    public function getAngelsPresentation()
    {   
        $markdownPath = resource_path('markdown/angels-presentation.md');
        
        if (!File::exists($markdownPath)) {
            return response()->json([
                'error' => 'Presentation not found'
            ], 404);
        }
        
        $content = File::get($markdownPath);
        
        return response()->json([
            'content' => $content
        ]);
    }
}
