import React from "react";
import { Wallet } from "lucide-react";
import CaisseTableRow from "./CaisseTableRow";

export default function CaisseTable({caisses = [],}) 
{
    return (
        <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {caisses.length === 0 ? (
                <div className="px-4 py-12 text-center sm:px-6 sm:py-14">
                    <div
                        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
                        style={{backgroundColor: "#E8F3F7",}}
                    >
                        <Wallet
                            size={24}
                            className="sm:hidden"
                            style={{color: "#16425B",}}
                        />
                        <Wallet
                            size={26}
                            className="hidden sm:block"
                            style={{color: "#16425B",}}
                        />
                    </div>
                    <h3
                        className="mt-4 text-sm font-semibold sm:text-base"
                        style={{color: "#16425B",}}
                    >
                        Aucune caisse enregistrée
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                        Cliquez sur « Calculer la caisse » pour commencer.
                    </p>
                </div>

            ) : (
                <div className="w-full overflow-x-auto lg:overflow-x-hidden">
                    <table className="w-full min-w-[1050px] table-fixed lg:min-w-0">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="w-[12%] px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500 lg:text-[11px]">
                                    Date
                                </th>
                                <th className="w-[12%] px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-slate-500 lg:text-[11px]">
                                    Total Disponible
                                </th>
                                <th className="w-[12%] px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-slate-500 lg:text-[11px]">
                                    Total caisse
                                </th>
                                <th className="w-[12%] px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-slate-500 lg:text-[11px]">
                                    Total Dettes
                                </th>
                                <th className="w-[13%] px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-slate-500 lg:text-[11px]">
                                    Total général
                                </th>
                                <th className="w-[13%] px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-slate-500 lg:text-[11px]">
                                    Solde final
                                </th>
                                <th className="w-[12%] px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-500 lg:text-[11px]">
                                    Statut
                                </th>
                                <th className="w-[14%] px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-500 lg:text-[11px]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {caisses.map((caisse) => (
                                <CaisseTableRow
                                    key={caisse.id}
                                    caisse={caisse}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}