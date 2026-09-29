<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [

            'auth' => [
                'user' => $request->user() ? $request->user()->load('company') : null,
            ],

            'notifications' => function () use ($request) {
                if (!$request->user()) {
                    return [];
                }

                return $request->user()
                    ->notifications()
                    ->latest()
                    ->take(10)
                    ->get();
            },

            'unreadNotificationsCount' => function () use ($request) {
                if (!$request->user()) {
                    return 0;
                }

                return $request->user()
                    ->unreadNotifications()
                    ->count();
            },

            'flash' => [
                'success' => fn () => $request->session()->get('success'),

                'document_url' => fn () => $request->session()->get('document_url'),

                'cloture' => fn () => $request->session()->get('cloture'),

                'error' => fn () => $request->session()->get('error'),

                'registration_link' => fn () =>
                    $request->session()->get('registration_link'),

                'registration_expires_at' => fn () =>
                    $request->session()->get('registration_expires_at'),
            ],
        ]);
    }
    
}
