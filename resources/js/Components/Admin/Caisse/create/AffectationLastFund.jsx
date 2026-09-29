import React from "react";

export default function AffectationLastFund({ employe }) {
    if (!employe) {
        return null;
    }

    const montant = Number(employe.dernier_fond ?? 0).toLocaleString(
        "fr-FR",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    );

    return (
        <div
            className="
                rounded-lg border border-[#81C3D7]/40
                bg-[#F0F7FA] p-3

                sm:rounded-xl sm:p-4
            "
        >
            <p className="text-[11px] font-medium text-slate-500 sm:text-xs">
                Dernier fond de caisse
            </p>

            <p
                className="
                    mt-1 text-lg font-bold text-[#16425B]
                    sm:text-xl
                "
            >
                {montant} DH
            </p>

            {employe.date_dernier_fond && (
                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                    Dernière affectation :{" "}
                    {employe.date_dernier_fond}
                </p>
            )}
        </div>
    );
}