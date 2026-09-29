import React from "react";
import { Link } from "@inertiajs/react";
import {Plus,} from "lucide-react";
import { COLORS } from "@/theme";

export default function DettesIndexHeader() {
    return (
        <div className="mb-6 flex items-center justify-between gap-2 sm:gap-3">

            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <div className="min-w-0">
                    <h1
                        className="truncate text-slate-800 text-lg font-bold sm:text-xl md:text-2xl"
                    >
                        Gestion des Dettes
                    </h1>

                    <p className="truncate text-[10px] text-slate-400 sm:text-xs md:text-sm">
                        Consultez et gérez les dettes enregistrées.
                    </p>

                </div>

            </div>

            <Link
                href={route("employe.dettes.create")}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:opacity-90 sm:gap-2 sm:px-3 sm:py-2 sm:text-xs md:px-4 md:py-2.5 md:text-sm"
                style={{backgroundColor: COLORS.dark,}}
            >
                <Plus
                    size={15}
                    className="shrink-0 sm:h-4 sm:w-4 md:h-[18px] md:w-[18px]"
                />

                <span className="whitespace-nowrap">
                    Ajouter une dette
                </span>
            </Link>

        </div>
    );
}
