
import { Search, X } from "lucide-react";
import { COLORS } from "../../theme";

const ACTION_OPTIONS = [
    { value: "", label: "Toutes les actions" },
    { value: "creation", label: "Création" },
    { value: "validation", label: "Validation" },
    { value: "refus", label: "Refus" },
    { value: "modification", label: "Modification" },
];

export default function HistoriqueFilters({search,setSearch,action,setAction,dateFrom,setDateFrom,dateTo,setDateTo,onApply,}) 
{
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-end">
                <div className="relative min-w-0 flex-1 sm:col-span-2 lg:col-span-1">
                    <Search
                        size={14}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 sm:left-3 sm:h-4 sm:w-4"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && onApply()
                        }
                        placeholder="Employé, référence, description..."
                        className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-8 text-[11px] text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#3A7CA5] focus:bg-white focus:ring-2 focus:ring-[#3A7CA5]/20 sm:h-10 sm:pl-9 sm:pr-9 sm:text-sm"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                onApply({ search: "" });
                            }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 transition hover:text-slate-500 sm:right-3"
                            aria-label="Effacer la recherche"
                        >
                            <X size={14} className="sm:h-4 sm:w-4" />
                        </button>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <select
                        value={action}
                        onChange={(e) => {
                            setAction(e.target.value);
                            onApply({ action: e.target.value });
                        }}
                        className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-600 outline-none transition focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 sm:h-10 sm:px-3 sm:text-sm"
                    >
                        {ACTION_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="min-w-0 flex-1">
                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => {
                            setDateFrom(e.target.value);
                            onApply({ date_from: e.target.value });
                        }}
                        className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-600 outline-none transition focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 sm:h-10 sm:px-3 sm:text-sm"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => {
                            setDateTo(e.target.value);
                            onApply({ date_to: e.target.value });
                        }}
                        className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-600 outline-none transition focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 sm:h-10 sm:px-3 sm:text-sm"
                    />
                </div>
                <button
                    type="button"
                    onClick={() => onApply()}
                    className="inline-flex h-9 w-full items-center justify-center rounded-lg px-3 text-xs font-semibold text-white transition hover:opacity-90 sm:h-10 sm:text-sm lg:w-auto lg:shrink-0"
                    style={{ backgroundColor: COLORS.mid }}
                >
                    Filtrer
                </button>
            </div>
        </div>
    );
}
