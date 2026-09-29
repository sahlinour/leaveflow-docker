<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $notifications = $user->notifications()
            ->latest()
            ->paginate(10)
            ->through(function ($notification) {
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'data' => $notification->data,
                    'read_at' => $notification->read_at,
                    'created_at' => $notification->created_at,
                ];
            });

        if (in_array($user->role->slug, ['admin', 'supervisor'])) {
            return Inertia::render('Admin/Notifications/index', [
                'notifications' => $notifications,
                'unreadNotificationsCount' => $user->unreadNotifications()->count(),
            ]);
        }
        
        return Inertia::render('Employe/Notifications/index', [
                'notifications' => $notifications,
                'unreadNotificationsCount' => $user->unreadNotifications()->count(),
        ]);
        
    }

    public function read(Request $request, $id)
    {
        $notification = $request->user()
            ->notifications()
            ->findOrFail($id);

        $notification->markAsRead();

        return back();
    }

    public function readAll(Request $request)
    {
        $request->user()
            ->unreadNotifications()
            ->update([
                'read_at' => now(),
            ]);

        return back();
    }
}