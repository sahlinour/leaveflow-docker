<?php

use App\Http\Controllers\EmployeeRegistrationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TwoFactorController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

// Routes publiques

Route::redirect('/', '/login');

Route::get(
    '/register/employee/{token}',
    [EmployeeRegistrationController::class, 'show']
)->name('employee.registration.show');

Route::post(
    '/register/employee/{token}',
    [EmployeeRegistrationController::class, 'store']
)->name('employee.registration.store');


// Dashboard Redirect


Route::middleware(['auth', 'verified'])->get('/dashboard', function () {

    $user = auth()->user();

    if (in_array($user->role->slug, ['admin', 'supervisor'])) {
        return redirect()->route('admin.dashboard');
    }

    return redirect()->route('employe.dashboard');

})->name('dashboard');

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
    
    Route::patch('/profile/comptable-email', [ProfileController::class, 'updateComptableEmail'])
        ->name('profile.comptable-email.update');

    // Authentification à deux facteurs
    Route::get('/profile/2fa', [TwoFactorController::class, 'show'])
        ->name('two-factor.show');

    Route::get('/profile/2fa/enable', [TwoFactorController::class, 'enable'])
        ->name('two-factor.enable');

    Route::post('/profile/2fa/confirm', [TwoFactorController::class, 'confirm'])
        ->name('two-factor.confirm');

    Route::delete('/profile/2fa', [TwoFactorController::class, 'disable'])
        ->name('two-factor.disable');

    // Notifications
    Route::put('/notifications/{id}/read',[NotificationController::class, 'read'])
        ->name('notifications.read');

    Route::put('/notifications/read-all',[NotificationController::class, 'readAll'])
        ->name('notifications.readAll');

});

require __DIR__ . '/admin.php';

require __DIR__ . '/employe.php';

require __DIR__.'/auth.php';