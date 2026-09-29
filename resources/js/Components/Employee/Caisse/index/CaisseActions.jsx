import React from "react";
import { Link, router } from "@inertiajs/react";
import {Download,Pencil,LockKeyhole,LockOpen,} from "lucide-react";

const COLORS = {
    secondary: "#2F6690",
};

const actionButtonClasses =
    "inline-flex items-center justify-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-semibold transition lg:px-1.5 lg:py-1 lg:text-[9px] xl:px-2 xl:text-[10px]";

const formatDate = (value) => {
    if (!value) return "-";

    const date = String(value).substring(0, 10);
    const [year, month, day] = date.split("-");

    if (!year || !month || !day) return value;

    return `${day}/${month}/${year}`;
};

export default function CaisseActions({ caisse }) {
    const estCloturee = caisse.statut === "cloturee";
    const estOuverte = caisse.statut === "ouverte";

    const cloturer = () => {
        const confirmation = window.confirm(
            "Êtes-vous sûr de vouloir clôturer cette caisse ?\n\n" +
                "Après clôture, la caisse ne pourra plus être modifiée."
        );

        if (!confirmation) return;

        router.post(
            route("caisse.cloturer", {
                caisse: caisse.id,
            }),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    const rouvrir = () => {
        const confirmation = window.confirm(
            `Êtes-vous sûr de vouloir rouvrir la caisse du ${formatDate(
                caisse.date_caisse
            )} ?`
        );

        if (!confirmation) return;

        router.post(
            route("caisse.rouvrir", {
                caisse: caisse.id,
            }),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <div className="flex items-center justify-center gap-1.5">
            {estOuverte && (
                <>
                    <Link
                        href={route("caisse.edit", {
                            caisse: caisse.id,
                        })}
                        title="Modifier"
                        className={`${actionButtonClasses} border border-slate-200 text-slate-600 hover:bg-slate-50`}
                    >
                        <Pencil size={12} />
                        <span>Modifier</span>
                    </Link>

                    <button
                        type="button"
                        onClick={cloturer}
                        title="Clôturer"
                        className={`${actionButtonClasses} text-white hover:opacity-90`}
                        style={{
                            backgroundColor: COLORS.secondary,
                        }}
                    >
                        <LockKeyhole size={12} />
                        <span>Clôturer</span>
                    </button>
                </>
            )}

            {estCloturee && (
                <>
                    <button
                        type="button"
                        onClick={rouvrir}
                        title="Rouvrir la caisse"
                        className={`${actionButtonClasses} bg-amber-50 text-amber-700 hover:bg-amber-100`}
                    >
                        <LockOpen size={12} />
                        <span>Rouvrir</span>
                    </button>

                    <a
                        href={route("caisse.cloture.pdf", {
                            caisse: caisse.id,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Télécharger PDF"
                        className={`${actionButtonClasses} border border-slate-200 text-slate-600 hover:bg-slate-50`}
                    >
                        <Download size={12} />
                        <span>PDF</span>
                    </a>
                </>
            )}
        </div>
    );
}
