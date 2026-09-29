<?php

namespace App\Services\Employee;

use App\Models\Company;
use App\Models\User;

class EmployeeMatriculeService
{
    /**
     * Générer le matricule d'un employé.
     */
    public function generate(?string $companyId): string
    {
        $company = $companyId
            ? Company::find($companyId)
            : null;

        $codeCompany = $this->getCompanyCode($company);

        $year = now()->year;

        $prefix = $codeCompany . '-' . $year . '-';

        $lastMatricule = User::withTrashed()
            ->where(
                'matricule',
                'like',
                $prefix . '%'
            )
            ->orderByRaw(
                'CAST(SUBSTRING_INDEX(matricule, "-", -1) AS UNSIGNED) DESC'
            )
            ->value('matricule');

        if (!$lastMatricule) {
            $number = 1;
        } else {
            $lastNumber = (int) substr(
                $lastMatricule,
                strrpos($lastMatricule, '-') + 1
            );

            $number = $lastNumber + 1;
        }

        return $prefix . str_pad(
            $number,
            4,
            '0',
            STR_PAD_LEFT
        );
    }

    /**
     * Générer le code de l'entreprise.
     */
    private function getCompanyCode(
        ?Company $company
    ): string {
        if (!$company) {
            return 'EMP';
        }

        $name = preg_replace(
            '/[^A-Za-z]/',
            '',
            $company->nom
        );

        return strtoupper(
            substr($name, 0, 3)
        ) ?: 'EMP';
    }
}