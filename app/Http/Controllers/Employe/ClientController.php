<?php

namespace App\Http\Controllers\Employe;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $clients = Client::where('company_id', $user->company_id)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Employe/Clients/index', [
            'clients' => $clients,
        ]);
    }

    public function create(Request $request)
    {
        $user = $request->user();
        $company = Company::find($user->company_id);

        return Inertia::render('Employe/Clients/create', [
            'company' => $company,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'telephone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'adresse' => ['nullable', 'string', 'max:500'],
        ]);

        $validated['company_id'] = $user->company_id;
        Client::create($validated);

        return redirect()
            ->route('employe.clients.index')
            ->with('success', 'Client créé avec succès.');
    }

    public function edit(Request $request, Client $client)
    {
        $this->authorizeClient($request, $client);

        return Inertia::render('Employe/Clients/edit', [
            'client' => $client,
        ]);
    }

    public function update(Request $request, Client $client)
    {
        $this->authorizeClient($request, $client);
        $validated = $request->validate([
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'telephone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'adresse' => ['nullable', 'string', 'max:500'],
        ]);

        $client->update($validated);

        return redirect()
            ->route('employe.clients.index')
            ->with('success', 'Client modifié avec succès.');
    }

    private function authorizeClient(Request $request,Client $client): void 
    {
        abort_if(
            $client->company_id !== $request->user()->company_id,
            403,
            'Vous n\'êtes pas autorisé à accéder à ce client.'
        );
    }
}
