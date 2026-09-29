<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\EmployeeRegistrationToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EmployeeRegistrationController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'company_id' => 'required|exists:companies,id',
        ]);
        $role = Role::where('slug', 'employe')->firstOrFail();
        $registration = EmployeeRegistrationToken::where(
            'company_id',
            $request->company_id
        )
            ->where('expires_at', '>', now())
            ->latest()
            ->first();
        if ($registration) {
            $url = route('employee.registration.show', [
                'token' => $registration->token,
            ]);
            return back()->with([
                'registration_link' => $url,
                'registration_expires_at' => $registration->expires_at->toISOString(),
            ]);
        }

        $token = Str::random(64);
        $registration = EmployeeRegistrationToken::create([
            'token' => $token,
            'company_id' => $request->company_id,
            'role_id' => $role->id,
            'created_by' => $request->user()->id,
            'expires_at' => now()->addHours(24),
        ]);
        $url = route('employee.registration.show', [
            'token' => $token,
        ]);
        return back()->with([
            'registration_link' => $url,
            'registration_expires_at' => $registration->expires_at->toISOString(),
        ]);
    }

    public function show(string $token)
    {
        $registration = EmployeeRegistrationToken::with([
            'company',
            'role',
        ])
            ->where('token', $token)
            ->first();
        if (!$registration || !$registration->isValid()) {
            return Inertia::render(
                'Auth/EmployeeRegistrationExpired'
            );
        }

        return Inertia::render('Auth/EmployeeRegister', [
            'token' => $token,
            'company' => [
                'id' => $registration->company->id,
                'nom' => $registration->company->nom,
            ],
            'expires_at' => $registration->expires_at,
        ]);
    }

    public function store(Request $request, string $token)
    {
        $registration = EmployeeRegistrationToken::where('token',$token)->first();
        if (!$registration || !$registration->isValid()) {
            return back()->withErrors([
                'token' => 'Ce lien d’inscription est expiré.',
            ]);
        }

        $validated = $request->validate([
            'prenom' => ['required','string','max:255',],
            'nom' => ['required','string','max:255',],
            'email' => ['required','email','max:255','unique:users,email',],
            'cin' => ['required','string','max:255','unique:users,cin',],
            'telephone' => ['nullable','string','max:30',],
            'adresse' => ['nullable','string','max:500',],
            'date_naissance' => ['nullable','date',],
            'sexe' => ['nullable','in:Homme,Femme',],
            'poste' => ['nullable','string','max:255',],
            'date_embauche' => ['nullable','date',],
            'statut' => ['nullable','in:Actif,Inactif,actif,inactif',],
            'photo' => ['nullable','image','mimes:jpg,jpeg,png','max:2048',],
            'password' => ['required','string','min:8','confirmed',],
        ]);
        $matricule = $this->generateMatricule();
        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request
                ->file('photo')
                ->store('employees', 'public');
        }

        $user = User::create([
            'matricule' => $matricule,
            'prenom' => $validated['prenom'],
            'nom' => $validated['nom'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'cin' => $validated['cin'],
            'telephone' => $validated['telephone'] ?? null,
            'adresse' => $validated['adresse'] ?? null,
            'date_naissance' => $validated['date_naissance'] ?? null,
            'sexe' => $validated['sexe'] ?? null,
            'poste' => $validated['poste'] ?? null,
            'date_embauche' => $validated['date_embauche'] ?? null,
            'photo' => $photoPath,
            'company_id' => $registration->company_id,
            'role_id' => $registration->role_id,
            'statut' => 'Actif',
        ]);

        return redirect()
            ->route('login')
            ->with(
                'success',
                'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.'
            );
    }

    private function generateMatricule()
    {
        $lastMatricule = User::where(
            'matricule',
            'like',
            'EMP-%'
        )
            ->orderByRaw(
                "CAST(SUBSTRING(matricule, 5) AS UNSIGNED) DESC"
            )
            ->value('matricule');

        $number = 1;
        if ($lastMatricule) {
            preg_match(
                '/(\d+)$/',
                $lastMatricule,
                $matches
            );
            if (!empty($matches[1])) {
                $number = (int) $matches[1] + 1;
            }
        }
        do {
            $matricule = 'EMP-' . str_pad(
                $number,
                4,
                '0',
                STR_PAD_LEFT
            );

            $number++;
        } while (
            User::where('matricule', $matricule)->exists()
        );
        return $matricule;
    }
}
