import React from "react";
import { CalendarDays } from "lucide-react";

export default function AffectationDateField({
    value,
    onChange,
    error,
}) {
    return (
        <div>
            <label
                htmlFor="date_caisse"
                className="
                    mb-1.5 block text-xs font-medium text-slate-700
                    sm:mb-2 sm:text-sm
                "
            >
                Date d'affectation
            </label>

            <div className="relative">
                <CalendarDays
                    size={16}
                    className="
                        absolute left-3 top-1/2
                        -translate-y-1/2 text-slate-400
                        sm:h-[18px] sm:w-[18px]
                    "
                />

                <input
                    id="date_caisse"
                    type="date"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="
                        w-full rounded-lg border border-slate-200
                        bg-white py-2.5 pl-9 pr-3
                        text-xs text-slate-700
                        outline-none transition
                        focus:border-[#2F6690]
                        focus:ring-1 focus:ring-[#81C3D7]/40

                        sm:rounded-xl sm:py-3 sm:pl-10
                        sm:pr-4 sm:text-sm
                    "
                />
            </div>

            {error && (
                <p className="mt-1.5 text-xs text-[#D80536] sm:mt-2 sm:text-sm">
                    {error}
                </p>
            )}
        </div>
    );
}