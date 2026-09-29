import React from "react";
import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { COLORS } from "@/theme";

export default function CaisseHeader({ compteCourantAssocie = 0 }) {
    return (
        <div className="mb-6 flex items-center justify-between gap-2 sm:gap-3">

            <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl">
                    Gestion Caisse
                </h1>

                <p className="mt-0.5 text-[9px] text-slate-400 sm:text-[10px] md:text-xs lg:text-sm">
                    Consultez l'historique et gérez les opérations de caisse
                </p>
            </div>

            <Link
                href={route("caisse.create")}
                className="
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    gap-1.5
                    rounded-lg
                    px-2.5
                    py-2
                    text-[11px]
                    font-medium
                    text-white
                    transition
                    hover:opacity-90
                    sm:gap-2
                    sm:px-3
                    sm:py-2
                    sm:text-xs
                    md:px-4
                    md:py-2.5
                    md:text-sm
                "
                style={{
                    backgroundColor: COLORS.dark,
                }}
            >
                <Plus
                    size={15}
                    className="shrink-0 sm:h-4 sm:w-4 md:h-[18px] md:w-[18px]"
                />

                <span className="whitespace-nowrap">
                    Calculer la caisse
                </span>
            </Link>

        </div>
    );
}
