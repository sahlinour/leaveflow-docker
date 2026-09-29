<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Liste des clients.
     */
    public function index()
    {
        $clients = Client::with('company')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Clients/index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Formulaire de création.
     */
    public function create()
    {
        $companies = Company::orderBy('nom')->get([
            'id',
            'nom',
        ]);

        return Inertia::render('Admin/Clients/create', [
            'companies' => $companies,
        ]);
    }

    /**
     * Enregistrer un client.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => ['required', 'uuid', 'exists:companies,id'],
            'nom' => ['required', 'string', 'max:100'],
            'prenom' => ['required', 'string', 'max:100'],
            'telephone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:150'],
            'adresse' => ['nullable', 'string', 'max:255'],
        ]);

        Client::create($validated);

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client créé avec succès.');
    }

    /**
     * Afficher un client.
     */
    public function show(Client $client)
    {
        $client->load('company', 'dettes');

        return Inertia::render('Admin/Clients/show', [
            'client' => $client,
        ]);
    }

    /**
     * Formulaire de modification.
     */
    public function edit(Client $client)
    {
        $companies = Company::orderBy('nom')->get([
            'id',
            'nom',
        ]);

        return Inertia::render('Admin/Clients/edit', [
            'client' => $client,
            'companies' => $companies,
        ]);
    }

    /**
     * Modifier un client.
     */
    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'company_id' => ['required', 'uuid', 'exists:companies,id'],
            'nom' => ['required', 'string', 'max:100'],
            'prenom' => ['required', 'string', 'max:100'],
            'telephone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:150'],
            'adresse' => ['nullable', 'string', 'max:255'],
        ]);

        $client->update($validated);

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client modifié avec succès.');
    }

    /**
     * Supprimer un client.
     */
    public function destroy(Client $client)
    {
        $client->delete();

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client supprimé avec succès.');
    }
}
