import React from "react";
import { useForm } from "@inertiajs/react";

export default function CompteCourantAssocieRow({ compte }) {
    const { data, setData, post, processing, errors } = useForm({
        montant_retourne: "",
    });

    const montant = Number(compte.montant ?? 0);

    const montantRetourne = Number(
        compte.montant_retourne ?? 0
    );

    const montantRestant = montant - montantRetourne;

    const formatMontant = (montant) => {
        return `${Number(montant ?? 0).toLocaleString("fr-FR")} DH`;
    };

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString("fr-FR");
    };

    const getStatut = (statut) => {
        switch (statut) {
            case "actif":
                return "Actif";

            case "retour_partiel":
                return "Retour partiel";

            case "retourne":
                return "Retourné";

            default:
                return "—";
        }
    };

    const handleRetour = (e) => {
        e.preventDefault();

        post(
            route(
                "employe.compte-courant-associe.retourner",
                compte.id
            )
        );
    };

    return (
        <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
            <td className="px-3 py-2.5 font-medium text-slate-700 sm:px-5 sm:py-3">
                {formatMontant(montant)}
            </td>

            <td className="px-3 py-2.5 text-slate-600 sm:px-5 sm:py-3">
                {formatMontant(montantRetourne)}
            </td>

            <td className="px-3 py-2.5 font-medium text-slate-700 sm:px-5 sm:py-3">
                {formatMontant(montantRestant)}
            </td>

            <td className="px-3 py-2.5 text-slate-600 sm:px-5 sm:py-3">
                {getStatut(compte.statut)}
            </td>

            <td className="px-3 py-2.5 text-slate-600 sm:px-5 sm:py-3">
                {formatDate(compte.date_affectation)}
            </td>

            <td className="px-3 py-2.5 text-slate-600 sm:px-5 sm:py-3">
                {formatDate(compte.date_retour)}
            </td>

            <td className="px-3 py-2.5 sm:px-5 sm:py-3">
                {compte.statut !== "retourne" ? (
                    <form
                        onSubmit={handleRetour}
                        className="flex min-w-[180px] flex-col gap-2"
                    >
                        <div className="flex gap-2">
                            <input
                                type="number"
                                min="0.01"
                                max={montantRestant}
                                step="0.01"
                                value={data.montant_retourne}
                                onChange={(e) =>
                                    setData(
                                        "montant_retourne",
                                        e.target.value
                                    )
                                }
                                placeholder="Montant"
                                className="w-24 rounded-lg border border-slate-200 px-2.5 py-2 text-xs text-slate-700 outline-none focus:border-[#2F6690] focus:ring-1 focus:ring-[#2F6690]"
                            />

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-[#2F6690] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#16425B] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? "..." : "Retourner"}
                            </button>
                        </div>

                        {errors.montant_retourne && (
                            <p className="text-xs text-red-500">
                                {errors.montant_retourne}
                            </p>
                        )}
                    </form>
                ) : (
                    <span className="text-xs text-slate-400">
                        Aucun retour
                    </span>
                )}
            </td>
        </tr>
    );
}