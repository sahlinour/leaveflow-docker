<?php

namespace App\Http\Requests\Employee;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEmployeeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $employee = $this->route('employee')
            ?? $this->route('id');

        $employeeId = is_object($employee)
            ? $employee->id
            : $employee;

        return [
            'prenom' => 'required|string|max:100',
            'nom' => 'required|string|max:100',

            'cin' => [
                'required',
                'string',
                'max:50',
                Rule::unique('users', 'cin')
                    ->ignore($employeeId),
            ],

            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')
                    ->ignore($employeeId),
            ],

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