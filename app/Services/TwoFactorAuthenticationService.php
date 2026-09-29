<?php

namespace App\Services;

use App\Models\User;
use PragmaRX\Google2FA\Google2FA;

class TwoFactorAuthenticationService
{
    public function __construct(
        private readonly Google2FA $google2fa
    ) {
    }

    public function generateSecret(): string
    {
        return $this->google2fa->generateSecretKey();
    }

    public function getOtpAuthUrl(User $user, string $secret): string
    {
        return $this->google2fa->getQRCodeUrl(
            config('app.name'),
            $user->email,
            $secret
        );
    }

    public function verifyCode(string $secret, string $code): bool
    {
        return $this->google2fa->verifyKey(
            $secret,
            $code,
            1
        );
    }
    public function enable(User $user, string $secret): void
    {
        $user->forceFill([
            'two_factor_secret' => $secret,
            'two_factor_enabled' => true,
            'two_factor_confirmed_at' => now(),
        ])->save();
    }

    public function disable(User $user): void
    {
        $user->forceFill([
            'two_factor_secret' => null,
            'two_factor_enabled' => false,
            'two_factor_confirmed_at' => null,
        ])->save();
    }
}