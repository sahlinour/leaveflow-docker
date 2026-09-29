<?php

namespace App\Http\Requests\Caisse;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CloturerCaisseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fond_caisse' => ['required','numeric','min:0',],
        ];
    }

    public function messages(): array
    {
        return [
            'fond_caisse.required' =>'Le fond de caisse est obligatoire.',
            'fond_caisse.numeric' =>'Le fond de caisse doit être un montant numérique.',
            'fond_caisse.min' =>'Le fond de caisse ne peut pas être négatif.',
        ];
    }
}
