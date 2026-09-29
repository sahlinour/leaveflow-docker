import React, { useState } from "react";
import { router } from "@inertiajs/react";
import {CalendarDays,Search,RotateCcw,} from "lucide-react";

export default function CaisseFilters({ filters = {} }) {
    const [date, setDate] = useState(
        filters.date ?? new Date().toISOString().split("T")[0]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get(
            route("admin.caisse.index"),
            {
                date,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleReset = () => {
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
        router.get(
            route("admin.caisse.index"),
            {
                date: today,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4 md:p-5"
        >
            <div
                className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-3 md:gap-4"
            >
                <div className="min-w-0 flex-1">
                    <div className="relative">
                        <CalendarDays
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 sm:h-4 sm:w-4 md:h-[18px] md:w-[18px]"
                        />

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-2 text-[11px] text-slate-700 outline-none transition focus:border-[#2F6690] focus:ring-1 focus:ring-[#2F6690]/30 sm:rounded-xl sm:py-2.5 sm:pl-10 sm:pr-3 sm:text-xs md:text-sm"
                        />
                    </div>
                </div>

                <div
                    className="flex w-full gap-2 sm:w-auto sm:shrink-0 md:gap-3"
                >
                    <button
                        type="submit"
                        className="
                            inline-flex flex-1
                            items-center justify-center gap-1.5
                            rounded-lg
                            px-3 py-2
                            text-[11px] font-semibold text-white
                            transition hover:opacity-90
                            sm:flex-none
                            sm:gap-2
                            sm:rounded-xl
                            sm:px-4 sm:py-2.5
                            sm:text-xs
                            md:px-5
                            md:text-sm
                        "
                        style={{backgroundColor: "#2F6690",}}
                    >
                        <Search
                            size={14}
                            className="sm:h-4 sm:w-4 md:h-[17px] md:w-[17px]"
                        />
                        <span>
                            Rechercher
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="
                            inline-flex flex-1
                            items-center justify-center gap-1.5
                            rounded-lg
                            border border-slate-200
                            bg-white
                            px-3 py-2
                            text-[11px] font-semibold
                            text-slate-600
                            transition hover:bg-slate-50
                            sm:flex-none
                            sm:gap-2
                            sm:rounded-xl
                            sm:px-4 sm:py-2.5
                            sm:text-xs
                            md:px-5
                            md:text-sm
                        "
                    >
                        <RotateCcw
                            size={14}
                            className="sm:h-4 sm:w-4 md:h-[17px] md:w-[17px]"
                        />

                        <span>
                            Aujourd'hui
                        </span>
                    </button>
                </div>
            </div>
        </form>
    );
}
