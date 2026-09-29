<?php

namespace App\Services;

use NumberFormatter;

class AmountToWordsService
{
    public function convert(float $amount): string
    {
        $formatter = new NumberFormatter('fr_FR', NumberFormatter::SPELLOUT);

        $amount = round($amount, 2);

        $dirhams = (int) floor($amount);
        $centimes = (int) round(($amount - $dirhams) * 100);

        $result = ucfirst(
            $formatter->format($dirhams)
        );

        $result .= $dirhams === 1
            ? ' dirham'
            : ' dirhams';

        if ($centimes > 0) {
            $result .= ' et ' . $formatter->format($centimes);

            $result .= $centimes === 1
                ? ' centime'
                : ' centimes';
        }

        return $result;
    }
}