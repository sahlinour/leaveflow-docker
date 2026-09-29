import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

export default function DetteFormHeader() {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
                <h1
                    className="truncate text-slate-800 text-lg font-bold sm:text-xl md:text-2xl"
                >
                    Ajouter des dettes
                </h1>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    Enregistrez les dettes du jour.
                </p>
            </div>

            <Link
                href={route("employe.dettes.index")}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
                <ArrowLeft size={17} />
                Retour
            </Link>
        </div>
    );
}