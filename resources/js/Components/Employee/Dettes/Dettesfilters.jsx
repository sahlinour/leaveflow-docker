import React from "react";
import {CalendarDays,Search,} from "lucide-react";

export default function DettesFilters({
    dateDebut,
    dateFin,
    onDateDebutChange,
    onDateFinChange,
    onSubmit,
    onReset,
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-end"
            >
                <div className="min-w-0 flex-1">
                    <div className="relative">
                        <CalendarDays
                            size={15}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 sm:left-3 sm:h-[17px] sm:w-[17px]"
                        />
                        <input
                            type="date"
                            value={dateDebut}
                            onChange={(event) =>onDateDebutChange(event.target.value)}
                            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-2.5 text-xs outline-none transition focus:border-[#2F6690] focus:ring-1 focus:ring-[#2F6690] sm:py-2.5 sm:pl-10 sm:pr-3 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="min-w-0 flex-1">
                    <div className="relative">
                        <CalendarDays
                            size={15}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 sm:left-3 sm:h-[17px] sm:w-[17px]"
                        />
                        <input
                            type="date"
                            value={dateFin}
                            onChange={(event) =>onDateFinChange(event.target.value)}
                            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-2.5 text-xs outline-none transition focus:border-[#2F6690] focus:ring-1 focus:ring-[#2F6690] sm:py-2.5 sm:pl-10 sm:pr-3 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="col-span-1 flex gap-2 sm:col-span-2 lg:w-auto">
                    <button
                        type="submit"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 sm:flex-none sm:px-4 sm:py-2.5 sm:text-sm"
                        style={{backgroundColor: "#2F6690",}}
                    >
                        <Search
                            size={15}
                            className="sm:h-[17px] sm:w-[17px]"
                        />
                        Filtrer
                    </button>

                    <button
                        type="button"
                        onClick={onReset}
                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:flex-none sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                        Réinitialiser
                    </button>
                </div>
            </form>
        </div>
    );
}
