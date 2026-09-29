import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";


export default function BankHistoryHeader() {
    return (
        <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
                <h1
                    className="truncate text-slate-800 text-lg font-bold sm:text-xl md:text-2xl"
                >
                    Historique des documents bancaires
                </h1>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    Consultez les documents bancaires que vous avez générés.
                </p>
            </div>

            <Link
                href={route("employe.bank-docs.index")}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:px-4 sm:text-sm"
            >
                <ArrowLeft
                    size={15}
                    className="sm:h-[17px] sm:w-[17px]"
                />
                Retour
            </Link>
        </div>
    );
}