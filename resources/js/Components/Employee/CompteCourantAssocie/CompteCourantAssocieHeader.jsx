import React from "react";

export default function CompteCourantAssocieHeader() {
    return (
        <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
            <div>
                <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl md:text-2xl">
                    Compte courant associé
                </h1>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    Gestion de vos montants affectés
                </p>
            </div>
        </div>
    );
}