<?php

use App\Http\Controllers\Admin\BankController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\CongeController;
use App\Http\Controllers\Admin\ContrainteCongeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DemandeCongeController as AdminDemandeCongeController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\HistoriqueCongeController;
use App\Http\Controllers\Admin\PeriodeBloqueeController;
use App\Http\Controllers\Admin\CaisseController;
use App\Http\Controllers\Admin\CompteCourantAssocieController;
use App\Http\Controllers\EmployeeRegistrationController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:admin,supervisor'])
    ->prefix('admin')
    ->group(function () {

        Route::get('/dashboard', [DashboardController::class,'index'])->name('admin.dashboard');

        // Notifications
        Route::get('/notifications', [NotificationController::class,'index'])->name('admin.notifications.index');

        // Companies
        Route::get('/companies/trash', [CompanyController::class,'trash'])->name('companies.trash');

        Route::post('/companies/{id}/restore', [CompanyController::class,'restore'])->name('companies.restore');

        Route::delete('/companies/{id}/force-delete', [CompanyController::class,'forceDelete'])->name('companies.forceDelete');

        Route::resource('companies', CompanyController::class);

        // Clients
        Route::resource('clients', ClientController::class);

        // Employees
        Route::get('/employees/trash', [EmployeeController::class,'trash'])->name('employees.trash');

        Route::post('/employees/{id}/restore', [EmployeeController::class,'restore'])->name('employees.restore');

        Route::delete('/employees/{id}/force-delete', [EmployeeController::class,'forceDelete'])->name('employees.forceDelete');

        Route::post('/employees/generate-registration-link', [EmployeeRegistrationController::class,'generate'])->name('admin.employees.registration.generate');

        Route::resource('employees', EmployeeController::class);

        // Congés
        Route::get('/conges/trash', [CongeController::class,'trash'])->name('conges.trash');

        Route::post('/conges/{id}/restore', [CongeController::class,'restore'])->name('conges.restore');

        Route::delete('/conges/{id}/force-delete', [CongeController::class,'forceDelete'])->name('conges.forceDelete');

        Route::resource('conges', CongeController::class);

        // Contraintes de congés
        Route::get('/companies/{company}/contraintes', [ContrainteCongeController::class,'index'])->name('companies.contraintes.index');

        Route::put('/contraintes-conges/{contrainteConge}', [ContrainteCongeController::class,'update'])->name('contraintes-conges.update');

        // Demandes de congés
        Route::resource('demandes-conges', AdminDemandeCongeController::class)->names('admin.demandes-conges');

        Route::put('/demandes/{demande}/commentaire', [AdminDemandeCongeController::class,'commentaire'])->name('demandes.commentaire');

        Route::get('/demandes-conges/{id}/pdf', [AdminDemandeCongeController::class,'pdf'])->name('admin.demandes-conges.pdf');

        Route::get('/demandes-conges/{id}/download', [AdminDemandeCongeController::class,'downloadPdf'])->name('admin.demandes-conges.download');

        // Périodes bloquées
        Route::resource('periodes-bloquees',PeriodeBloqueeController::class)->except(['show']);

        // Historique des congés
        Route::get('/historique-conges', [HistoriqueCongeController::class,'index'])->name('historique-conges.index');

        // Bank Documents
        Route::get('/bank-documents', [BankController::class, 'index'])
            ->name('admin.bank-documents.index');

        Route::middleware('role:admin')->group(function () {

            Route::get('/bank-documents/create', [BankController::class, 'create'])
                ->name('admin.bank-documents.create');

            Route::post('/bank-documents', [BankController::class, 'store'])
                ->name('admin.bank-documents.store');

            Route::get('/bank-documents/{bank_document}/edit', [BankController::class, 'edit'])
                ->name('admin.bank-documents.edit');

            Route::put('/bank-documents/{bank_document}', [BankController::class, 'update'])
                ->name('admin.bank-documents.update');

            Route::delete('/bank-documents/{bank_document}', [BankController::class, 'destroy'])
                ->name('admin.bank-documents.destroy');
        });
        
        // Gestion Caisse
        Route::prefix('caisse')->group(function () {
            Route::get('/', [CaisseController::class, 'index'])
                ->name('admin.caisse.index');
            
            Route::get('/create', [CaisseController::class, 'create'])
                ->name('admin.caisse.create');

            Route::post('/affecter-fond', [CaisseController::class, 'affecter'])
                ->name('admin.caisse.affecter');

            Route::get('/caisse/{caisse}/edit',[CaisseController::class, 'edit'])->name('admin.caisse.edit');

            Route::put('/caisse/{caisse}',[CaisseController::class, 'update'])->name('admin.caisse.update');
        });
        // Compte courant associé
        Route::prefix('compte-courant-associe')->group(function () {

            Route::get('/', [CompteCourantAssocieController::class, 'index'])
                ->name('admin.compte-courant-associe.index');

            Route::get('/create', [CompteCourantAssocieController::class, 'create'])
                ->name('admin.compte-courant-associe.create');
                
            Route::post('/', [CompteCourantAssocieController::class, 'store'])
                ->name('admin.compte-courant-associe.store');
        });
    });