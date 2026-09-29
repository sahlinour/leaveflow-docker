import React from "react";

export default function CaisseRow({coupure,montant,quantite,onChange,}) 
{
    return (
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-3 md:items-center">
            <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
                    Coupure
                </p>
                <p
                    className="mt-1 text-lg font-bold sm:text-xl"
                    style={{
                        color: "#16425B",
                    }}
                >
                    {coupure} DH
                </p>
            </div>

            <div>
                <label
                    htmlFor={`montant-${coupure}`}
                    className="text-xs font-medium text-slate-600 sm:text-sm"
                >
                    Montant disponible
                </label>
                <div className="relative mt-1">
                    <input
                        id={`montant-${coupure}`}
                        type="number"
                        min="0"
                        step={coupure}
                        value={montant}
                        onChange={(event) =>
                            onChange(coupure, event.target.value)
                        }
                        placeholder="0"
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-12 text-xs outline-none transition focus:border-[#2F6690] focus:ring-2 focus:ring-[#81C3D7]/30 sm:text-sm"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 sm:text-sm">
                        DH
                    </span>
                </div>
            </div>

            <div className="rounded-lg bg-white p-3">
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
                    Quantité calculée
                </p>
                <p
                    className="mt-1 text-base font-bold sm:text-lg"
                    style={{
                        color: "#2F6690",
                    }}
                >
                    {quantite}{" "}
                    <span className="text-sm sm:text-base">
                        {coupure === 1
                            ? "pièce"
                            : "billets / pièces"}
                    </span>
                </p>
            </div>
        </div>
    );
}