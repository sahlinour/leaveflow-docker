<?php

namespace App\Http\Requests\DemandeConge;

use Illuminate\Foundation\Http\FormRequest;

class StoreDemandeCongeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date_debut' => [
                'required',
                'date',
                /* 'after_or_equal:today', */
            ],
            'date_fin' => [
                'required',
                'date',
                'after_or_equal:date_debut',
            ],
            'type_conge' => [
                'required',
                'string',
            ],
            'motif' => [
                'nullable',
                'string',
            ],
            'justificatif' => [
                'nullable',
                'file',
                'mimes:pdf,jpg,jpeg,png',
            ],
        ];
    }
}