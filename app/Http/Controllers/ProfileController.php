<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Parametre;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user()->load('role');

        if (in_array($user->role?->slug, ['admin', 'supervisor'])) {
            $comptableEmail = Parametre::where('cle', 'comptable_email')->value('valeur');

            if (!$comptableEmail) {
                $comptableEmail = env('COMPTABLE_EMAIL');
            }

            return Inertia::render('Profile/EditAdmin', [
                'mustVerifyEmail' => $user instanceof MustVerifyEmail,
                'status' => session('status'),
                'comptableEmail' => $comptableEmail,
            ]);
        }

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill([ 'prenom' => $request->prenom, 'nom' => $request->nom, 'email' => $request->email, ]);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function updateComptableEmail(Request $request): RedirectResponse
    {
        $request->validate([
            'comptable_email' => ['required', 'email', 'max:255'],
        ]);

        $user = $request->user()->load('role');

        if ($user->role?->slug !== 'admin') {
            abort(403);
        }

        Parametre::updateOrCreate(
            ['cle' => 'comptable_email'],
            ['valeur' => $request->comptable_email]
        );

        return Redirect::route('profile.edit')
            ->with('status', 'Email du comptable mis à jour avec succès.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
