import React from "react";
import { Wallet } from "lucide-react";

export default function AffectationFundField({
    value,
    onChange,
    error,
}) {
    return (
        <div>
            <label
                htmlFor="fond_caisse"
                className="
                    mb-1.5 block text-xs font-medium text-slate-700
                    sm:mb-2 sm:text-sm
                "
            >
                Montant du fond de caisse
            </label>

            <div className="relative">
                <Wallet
                    size={16}
                    className="
                        absolute left-3 top-1/2
                        -translate-y-1/2 text-slate-400
                        sm:h-[18px] sm:w-[18px]
                    "
                />

                <input
                    id="fond_caisse"
                    type="number"
                    min="0"
                    step="0.01"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Ex : 5000"
                    className="
                        w-full rounded-lg border border-slate-200
                        bg-white py-2.5 pl-9 pr-12
                        text-xs text-slate-700
                        outline-none transition
                        focus:border-[#2F6690]
                        focus:ring-1 focus:ring-[#81C3D7]/40

                        sm:rounded-xl sm:py-3 sm:pl-10
                        sm:pr-14 sm:text-sm
                    "
                />

                <span
                    className="
                        absolute right-3 top-1/2
                        -translate-y-1/2
                        text-xs font-medium text-slate-400
                        sm:text-sm
                    "
                >
                    DH
                </span>
            </div>

            {error && (
                <p className="mt-1.5 text-xs text-[#D80536] sm:mt-2 sm:text-sm">
                    {error}
                </p>
            )}
        </div>
    );
}