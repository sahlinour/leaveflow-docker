import React from "react";
import { router } from "@inertiajs/react";
import { Filter, RotateCcw } from "lucide-react";

export default function CaisseFilters({
    filters = {},
}) {
    const [dateDebut, setDateDebut] = React.useState(
        filters.date_debut || ""
    );

    const [dateFin, setDateFin] = React.useState(
        filters.date_fin || ""
    );

    const submit = (e) => {
        e.preventDefault();
        router.get(
            route("caisse.index"),
            {
                date_debut: dateDebut || undefined,
                date_fin: dateFin || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const reset = () => {
        setDateDebut("");
        setDateFin("");
        router.get(
            route("caisse.index"),
            {},
            {
                preserveState: false,
                preserveScroll: true,
            }
        );
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

            <form onSubmit={submit}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-end"
            >
                <div className="min-w-0 flex-1">

                    <input
                        id="date_debut"
                        type="date"
                        value={dateDebut}
                        onChange={(e) =>setDateDebut(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs outline-none transition focus:border-[#2F6690] focus:ring-1 focus:ring-[#2F6690] sm:px-3 sm:py-2.5 sm:text-sm"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <input
                        id="date_fin"
                        type="date"
                        value={dateFin}
                        onChange={(e) =>setDateFin(e.target.value)}
                        className=" w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs outline-none transition focus:border-[#2F6690] focus:ring-1 focus:ring-[#2F6690] sm:px-3 sm:py-2.5 sm:text-sm"
                    />
                </div>

                <div className="col-span-1 flex gap-2 sm:col-span-2 lg:w-auto">
                    <button
                        type="submit"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 sm:flex-none sm:px-4 sm:py-2.5 sm:text-sm"
                        style={{backgroundColor: "#2F6690",}}
                    >
                        <Filter size={15}
                            className="sm:h-[17px] sm:w-[17px]"
                        />
                        Filtrer
                    </button>

                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 sm:flex-none sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                        <RotateCcw
                            size={15}
                            className="sm:h-[17px] sm:w-[17px]"
                        />
                        Réinitialiser
                    </button>
                </div>
            </form>
        </div>
    );
}
