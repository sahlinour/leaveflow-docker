<?php

namespace App\Http\Requests\Employee;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'prenom' => 'required|string|max:100',
            'nom' => 'required|string|max:100',

            'cin' => [
                'required',
                'string',
                'max:50',
                'unique:users,cin',
            ],

            'email' => [
                'required',
                'email',
                'unique:users,email',
            ],

            'password' => 'required|min:8',

            'telephone' => 'nullable|string|max:30',
            'adresse' => 'nullable|string',

            'photo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png',
                'max:2048',
            ],

            'date_naissance' => 'nullable|date',
            'sexe' => 'nullable|in:homme,femme',

            'poste' => 'nullable|string|max:100',
            'date_embauche' => 'nullable|date',

            'statut' => [
                'required',
                'in:actif,inactif',
            ],

            'company_id' => [
                'nullable',
                'exists:companies,id',
            ],

            'role_id' => [
                'required',
                'exists:roles,id',
            ],
        ];
    }
}