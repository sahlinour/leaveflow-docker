<?php

namespace App\Services;

use App\Models\CompanyBank;
use PhpOffice\PhpWord\TemplateProcessor;

class BankDocumentService
{
    public function generate(
        CompanyBank $companyBank,
        float $montant,
        string $dateVirement,
        string $dateDocument,
        string $reference
    ): string {

        if (!$companyBank->bank) {
            throw new \Exception(
                'La banque associée à cette configuration est introuvable.'
            );
        }

        $templatePath = $companyBank->bank->template_path;

        if (!$templatePath) {
            throw new \Exception(
                'Aucun template Word n\'est configuré pour cette banque.'
            );
        }

        $templateFullPath = storage_path(
            'app/' . $templatePath
        );

        if (!file_exists($templateFullPath)) {
            throw new \Exception(
                'Le template Word est introuvable : ' . $templateFullPath
            );
        }

        $template = new TemplateProcessor($templateFullPath);
        $companyName = $companyBank->company->nom;

        $template->setValue(
            'reference',
            $reference
        );
        $template->setValue(
            'company_name',
            $companyName
        );

        $template->setValue(
            'company_account',
            $companyBank->numero_compte
        );

        $template->setValue(
            'amount',
            number_format($montant, 2, '.', '')
        );

        $amountToWords = app(AmountToWordsService::class);

        $template->setValue(
            'amount_words',
            $amountToWords->convert($montant)
        );

        $template->setValue(
            'beneficiary_name',
            $companyBank->nom_beneficiaire
        );

        $template->setValue(
            'beneficiary_account',
            $companyBank->numero_compte_beneficiaire
        );

        $template->setValue(
            'transfer_date',
            $dateVirement
        );

        $template->setValue(
            'motif',
            $companyBank->motif ?? ''
        );
        $template->setValue(
            'city',
            $companyBank->ville
        );
        $template->setValue(
            'document_date',
            $dateDocument
        );

        $directory = storage_path(
            'app/public/bank-documents/generated'
        );

        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $fileName = 'bank-document-' . uniqid() . '.docx';

        $outputPath = $directory . '/' . $fileName;

        $template->saveAs($outputPath);
        return 'bank-documents/generated/' . $fileName;
    }
}