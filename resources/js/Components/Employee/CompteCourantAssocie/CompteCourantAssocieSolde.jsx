import React from "react";

export default function CompteCourantAssocieSolde({ solde = 0 }) {
    const formatMontant = (montant) => {
        return `${Number(montant ?? 0).toLocaleString("fr-FR")} DH`;
    };

    return (
        <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <p className="text-xs font-medium text-slate-400 sm:text-sm">
                Solde actuel
            </p>

            <p className="mt-2 text-2xl font-bold text-[#2F6690] sm:text-3xl">
                {formatMontant(solde)}
            </p>

            <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                Montant encore à retourner
            </p>
        </div>
    );
}