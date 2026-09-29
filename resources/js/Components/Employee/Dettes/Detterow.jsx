import React from "react";
import { Banknote, Trash2, UserRound } from "lucide-react";

export default function DetteRow({dette,index,clients = [],canDelete,onChange,onRemove,}) 
{
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
                <div className="flex min-w-0 items-center gap-2">
                    <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9"
                        style={{ backgroundColor: "#E8F3F7" }}
                    >
                        <UserRound
                            size={15}
                            className="sm:h-4 sm:w-4"
                            style={{ color: "#2F6690" }}
                        />
                    </div>

                    <span className="truncate text-xs font-semibold text-slate-700 sm:text-sm">
                        Dette {index + 1}
                    </span>
                </div>

                {canDelete && (
                    <button
                        type="button"
                        onClick={() => onRemove(dette.id)}
                        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 py-2 text-[11px] font-semibold text-red-600 transition hover:bg-red-50 sm:px-3 sm:py-2 sm:text-xs"
                    >
                        <Trash2
                            size={13}
                            className="sm:h-[15px] sm:w-[15px]"
                        />
                        Supprimer
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="min-w-0">
                    <label className="mb-1.5 block text-xs font-medium text-slate-600 sm:mb-2 sm:text-sm">
                        Client
                    </label>
                    <div className="relative">
                        <UserRound
                            size={15}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 sm:left-3 sm:h-[17px] sm:w-[17px]"
                        />

                        <select
                            value={dette.client_id ?? ""}
                            onChange={(event) =>onChange(dette.id,"client_id",event.target.value)}
                            className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs outline-none transition focus:border-[#2F6690] focus:ring-1 focus:ring-[#2F6690] sm:py-2.5 sm:pl-10 sm:text-sm"
                        >
                            <option value="">
                                Sélectionner un client
                            </option>

                            {clients.map((client) => (
                                <option
                                    key={client.id}
                                    value={client.id}
                                >
                                    {client.prenom} {client.nom}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="min-w-0">
                    <label className="mb-1.5 block text-xs font-medium text-slate-600 sm:mb-2 sm:text-sm">
                        Montant
                    </label>

                    <div className="relative">
                        <Banknote
                            size={15}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 sm:left-3 sm:h-[17px] sm:w-[17px]"
                        />

                        <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={dette.montant ?? ""}
                            onChange={(event) =>onChange(dette.id,"montant",event.target.value)}
                            placeholder="Ex. 500"
                            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-10 text-xs outline-none transition focus:border-[#2F6690] focus:ring-1 focus:ring-[#2F6690] sm:py-2.5 sm:pl-10 sm:pr-14 sm:text-sm"
                        />

                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-medium text-slate-400 sm:right-3 sm:text-sm">
                            DH
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}