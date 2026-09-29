import React from "react";
import { Link } from "@inertiajs/react";
import {ArrowLeft,} from "lucide-react";

export default function CalculateHeader({modeModification = false,}) 
{
    return (
        <div className="mb-6 flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <div className="min-w-0">
                    <h1
                        className="truncate text-slate-800 text-lg font-bold sm:text-xl md:text-2xl"
                    >
                        {modeModification
                            ? "Modifier la caisse"
                            : "Calculer la caisse"}
                    </h1>
                    <p className="truncate text-[10px] text-slate-400 sm:text-xs md:text-sm">
                        {modeModification
                            ? "Modifiez les montants de la caisse."
                            : "Saisissez le montant disponible pour chaque coupure."}
                    </p>

                </div>
            </div>

            <Link
                href={route("caisse.index")}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:text-sm"
            >
                <ArrowLeft
                    size={17}
                />

                Retour
            </Link>

        </div>
    );
}
