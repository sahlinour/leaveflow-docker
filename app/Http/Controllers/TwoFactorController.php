<?php

namespace App\Http\Controllers;

use App\Services\TwoFactorAuthenticationService;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TwoFactorController extends Controller
{
    public function __construct(
        private readonly TwoFactorAuthenticationService $twoFactorService
    ) {
    }

    public function show(Request $request): Response
    {
        $user = $request->user();
        return Inertia::render('Profile/TwoFactorAuthentication', [
            'enabled' => (bool) $user->two_factor_enabled,
        ]);
    }

    public function enable(Request $request): Response
    {
        $user = $request->user();

        if ($user->two_factor_enabled) {
            return Inertia::render('Profile/TwoFactorAuthentication', [
                'enabled' => true,
            ]);
        }
        $secret = $request->session()->get('two_factor_setup_secret');
        if (! $secret) {
            $secret = $this->twoFactorService->generateSecret();
            $request->session()->put(
                'two_factor_setup_secret',
                $secret
            );
        }
        $otpAuthUrl = $this->twoFactorService->getOtpAuthUrl(
            $user,
            $secret
        );
        return Inertia::render('Profile/TwoFactorAuthentication', [
            'enabled' => false,
            'secret' => $secret,
            'otpAuthUrl' => $otpAuthUrl,
        ]);
    }

    public function confirm(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'digits:6'],
        ]);

        $user = $request->user();
        $secret = $request->session()->get('two_factor_setup_secret');

        if (! $secret) {
            return back()->withErrors([
                'code' => 'La configuration de la 2FA a expiré. Veuillez recommencer.',
            ]);
        }

        if (! $this->twoFactorService->verifyCode(
            $secret,
            $request->code
        )) {
            return back()->withErrors([
                'code' => 'Le code de vérification est incorrect.',
            ]);
        }

        $this->twoFactorService->enable(
            $user,
            $secret
        );

        $request->session()->forget('two_factor_setup_secret');

        return redirect()
            ->route('profile.edit')
            ->with('status', 'two-factor-enabled');
    }

    public function disable(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $this->twoFactorService->disable(
            $request->user()
        );

        $request->session()->forget('two_factor_setup_secret');

        return redirect()
            ->route('profile.edit')
            ->with('status', 'two-factor-disabled');
    }

    public function challenge(Request $request): Response
    {
        if (
            ! $request->session()->get('2fa_pending') ||
            ! $request->session()->get('2fa_user_id')
        ) {
            return redirect()->route('login');
        }

        return Inertia::render('Auth/TwoFactorChallenge');
    }

    public function verifyChallenge(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'digits:6'],
        ]);

        if (
            ! $request->session()->get('2fa_pending') ||
            ! $request->session()->get('2fa_user_id')
        ) {
            return redirect()->route('login');
        }

        $user = User::find($request->session()->get('2fa_user_id'));

        if (! $user || ! $user->two_factor_enabled || ! $user->two_factor_secret) {
            $request->session()->forget([
                '2fa_pending',
                '2fa_user_id',
            ]);

            return redirect()->route('login');
        }

        if (! $this->twoFactorService->verifyCode(
            $user->two_factor_secret,
            $request->code
        )) {
            return back()->withErrors([
                'code' => 'Le code de vérification est incorrect.',
            ]);
        }

        Auth::login($user);

        $request->session()->forget([
            '2fa_pending',
            '2fa_user_id',
        ]);

        $request->session()->regenerate();

        return redirect()->intended(
            route('dashboard', absolute: false)
        );
    }
}
