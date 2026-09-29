import React from "react";
import {UserRound,Trash2,} from "lucide-react";

export default function DetteJourTable({listeDettes,formatMoney,onDelete,}) 
{
    return (
        <table className="block w-full sm:table">
            <thead className="hidden sm:table-header-group">
                <tr className="border-b border-slate-100">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Nom complet
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Montant
                    </th>

                    <th className="w-20 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Actions
                    </th>
                </tr>
            </thead>

            <tbody className="block divide-y divide-slate-100 sm:table-row-group">
                {listeDettes.map((dette) => (
                    <tr
                        key={dette.id}
                        className="block px-3 py-3 transition hover:bg-slate-50 sm:table-row sm:px-0"
                    >

                        <td className="block px-0 py-0 sm:table-cell sm:px-4 sm:py-3">
                            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:hidden">
                                Nom complet
                            </p>

                            <div className="flex min-w-0 items-center gap-2">
                                <UserRound
                                    size={15}
                                    className="hidden shrink-0 text-slate-400 sm:block"
                                />

                                <span className="truncate text-xs font-medium text-slate-700 sm:text-sm">
                                    {dette.client
                                        ? `${dette.client.prenom} ${dette.client.nom}`
                                        : "Client inconnu"}
                                </span>
                            </div>
                        </td>

                        <td className="block px-0 py-0 text-left sm:table-cell sm:px-4 sm:py-3 sm:text-right">
                            <p className="mb-0.5 mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:hidden">
                                Montant
                            </p>

                            <span
                                className="whitespace-nowrap text-xs font-semibold sm:text-sm"
                                style={{
                                    color: "#16425B",
                                }}
                            >
                                {formatMoney(dette.montant)} DH
                            </span>
                        </td>

                        <td className="block px-0 py-0 sm:table-cell sm:w-20 sm:px-4 sm:py-3 sm:text-center">
                            <div className="mt-3 flex items-center justify-end border-t border-slate-100 pt-2 sm:mt-0 sm:justify-center sm:border-0 sm:pt-0">
                                <button
                                    type="button"
                                    onClick={() => onDelete(dette.id)}
                                    title="Supprimer"
                                    aria-label={`Supprimer la dette de ${dette.nom_complet}`}
                                    className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[11px] font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600 sm:h-8 sm:px-2.5 sm:text-xs"
                                >
                                    <Trash2
                                        size={14}
                                        className="sm:h-[15px] sm:w-[15px]"
                                    />

                                    <span className="sm:hidden">
                                        Supprimer
                                    </span>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}