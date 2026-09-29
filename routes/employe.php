<?php

use App\Http\Controllers\Employe\BankDocumentController;
use App\Http\Controllers\Employe\CalendarController;
use App\Http\Controllers\Employe\ClientController;
use App\Http\Controllers\Employe\DashboardEmployeeController;
use App\Http\Controllers\Employe\DemandeCongeController;
use App\Http\Controllers\Employe\CaisseController;
use App\Http\Controllers\Employe\DetteController;
use App\Http\Controllers\Employe\ClotureCaisseController;
use App\Http\Controllers\Employe\CompteCourantAssocieController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:employe'])
    ->prefix('employe')
    ->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardEmployeeController::class,'index'])->name('employe.dashboard');
        
        // Demandes de congés
        Route::resource('demandes-conges',DemandeCongeController::class);

        Route::put('/demandes-conges/{id}/annuler', [DemandeCongeController::class,'annuler'])->name('demandes-conges.annuler');
        
        Route::get('/demandes-conges/{id}/pdf',[DemandeCongeController::class, 'pdf'])->name('demandes-conges.pdf');
        
        // Calendar
        Route::get('/calendar', [CalendarController::class,'index'])->name('employe.calendar');
    
        // Notifications
        Route::get('/notifications', [NotificationController::class,'index'])->name('employe.notifications.index');


        Route::middleware('bureau.change')->group(function () {
            // Gestion Clients
            Route::resource('clients', ClientController::class)->except(['show', 'destroy'])->names('employe.clients');

            // Gestion de Caisse
            Route::prefix('caisse')->group(function () {
                Route::get('/', [CaisseController::class, 'index'])->name('caisse.index');

                Route::get('/create', [CaisseController::class, 'create'])->name('caisse.create');

                Route::post('/{caisse}', [CaisseController::class, 'store'])->name('caisse.store');

                Route::get('/{caisse}/edit', [CaisseController::class, 'edit'])->name('caisse.edit');

                Route::post('/{caisse}/cloturer', [CaisseController::class, 'cloturer'])->name('caisse.cloturer');
            
                // Export Excel de Caisse
                Route::get('/{caisse}/cloture/pdf', [ClotureCaisseController::class, 'pdf'])->name('caisse.cloture.pdf');
                Route::post('/{caisse}/rouvrir', [CaisseController::class, 'rouvrir'])
                    ->name('caisse.rouvrir');
            });

            Route::prefix('compte-courant-associe')->group(function () {

                Route::get('/', [CompteCourantAssocieController::class, 'index'])
                    ->name('employe.compte-courant-associe.index');

                Route::post('/{compte}/retourner', [CompteCourantAssocieController::class, 'retourner'])
                    ->name('employe.compte-courant-associe.retourner');
            });

            // Gestion des dettes 
            Route::prefix('dettes')->group(function () {

                Route::get('/', [DetteController::class, 'index'])->name('employe.dettes.index');

                Route::get('/create', [DetteController::class, 'create'])->name('employe.dettes.create');

                Route::post('/', [DetteController::class, 'store'])->name('employe.dettes.store');

                Route::delete('/{dette}', [DetteController::class, 'destroy'])->name('employe.dettes.destroy');
            });

            // Bank Documents
            Route::get('/bank-docs', [BankDocumentController::class,'index'])->name('employe.bank-docs.index');

            Route::post('/bank-docs', [BankDocumentController::class,'store'])->name('employe.bank-docs.store');

            Route::get('/bank-docs/history', [BankDocumentController::class,'history'])->name('employe.bank-docs.history');
        });
    });