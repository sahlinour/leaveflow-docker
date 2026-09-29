import React from "react";
import { router } from "@inertiajs/react";
import { Pencil, UserRound } from "lucide-react";

export default function CaisseEmployeeRow({
    caisse,
}) {
    const employe = caisse?.user;

    const fondCaisse = Number(
        caisse?.fond_caisse ?? 0
    );

    const formatMontant = (montant) =>
        Number(montant).toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const estCloturee =
        caisse?.statut === "cloturee";

    const handleModifier = () => {
        router.get(
            route("admin.caisse.edit", {
                caisse: caisse.id,
            })
        );
    };

    return (
        <tr className="border-b border-slate-100 last:border-0 dark:border-slate-700">

            {/* Employé */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">

                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-full"
                        style={{
                            backgroundColor: "#E8F3F7",
                            color: "#2F6690",
                        }}
                    >
                        <UserRound size={18} />
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                            {employe?.prenom}{" "}
                            {employe?.nom}
                        </p>

                        {employe?.matricule && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {employe.matricule}
                            </p>
                        )}
                    </div>

                </div>
            </td>

            {/* Fond */}
            <td className="px-6 py-4">
                <span className="text-base font-bold text-slate-900 dark:text-white">
                    {formatMontant(fondCaisse)} DH
                </span>
            </td>

            {/* Statut */}
            <td className="px-6 py-4">
                {estCloturee ? (
                    <span
                        className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                            backgroundColor: "#FCE8ED",
                            color: "#D80536",
                        }}
                    >
                        Clôturée
                    </span>
                ) : (
                    <span
                        className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                            backgroundColor: "#E6F7EC",
                            color: "#0F9D58",
                        }}
                    >
                        Affecté
                    </span>
                )}
            </td>

            {/* Action */}
            <td className="px-6 py-4 text-right">
                <button
                    type="button"
                    onClick={handleModifier}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-90"
                    style={{
                        backgroundColor: "#E8F3F7",
                        color: "#2F6690",
                    }}
                >
                    <Pencil size={16} />
                    Modifier
                </button>
            </td>

        </tr>
    );
}