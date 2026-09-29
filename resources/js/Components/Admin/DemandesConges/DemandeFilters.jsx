import { router } from "@inertiajs/react";
import { COLORS } from "@/theme";

export default function DemandeFilters({ filters = {}, counts = {} }) {
    const filtersList = [
        { label: "Toutes", value: "", count: counts.all },
        { label: "En attente", value: "En attente", count: counts.pending },
        { label: "Approuvées", value: "Approuvée", count: counts.approved },
        { label: "Refusées", value: "Refusée", count: counts.rejected },
    ];

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 mb-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {filtersList.map((item) => {
                    const active = (filters.statut || "") === item.value;

                    return (
                        <button
                            key={item.value}
                            onClick={() =>
                                router.get(
                                    route("admin.demandes-conges.index"),
                                    { statut: item.value },
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                    }
                                )
                            }
                            className={`flex items-center justify-center gap-2 rounded-lg px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-medium transition ${
                                active
                                    ? "text-white shadow-sm"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                            style={{
                                backgroundColor: active
                                    ? COLORS.dark
                                    : undefined,
                            }}
                        >
                            <span>{item.label}</span>

                            <span
                                className={`min-w-[22px] h-5 px-1.5 flex items-center justify-center rounded-full text-[10px] sm:text-xs font-semibold ${
                                    active
                                        ? "bg-white/20 text-white"
                                        : "bg-white text-slate-500"
                                }`}
                            >
                                {item.count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}