import { Search, X } from "lucide-react";
import { COLORS } from "@/theme";

export default function EmployeeFilters({
    search,
    setSearch,
    company,
    setCompany,
    companies,
    onFilter,
}) {
    const handleCompanyChange = (value) => {
        setCompany(value);

        onFilter({
            company: value,
        });
    };

    const clearSearch = () => {
        setSearch("");

        onFilter({
            search: "",
        });
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">

                {/* Recherche */}
                <div className="relative flex-1 w-full sm:min-w-[240px]">
                    <Search
                        size={14}
                        className="sm:w-4 sm:h-4 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onFilter();
                            }
                        }}
                        placeholder="Rechercher par nom ou email..."
                        className="w-full h-9 sm:h-10 bg-slate-50 border border-slate-200 rounded-lg pl-9 sm:pl-10 pr-8 sm:pr-9 py-2 text-[11px] sm:text-sm text-slate-700 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                            aria-label="Effacer la recherche"
                        >
                            <X size={13} className="sm:w-[15px] sm:h-[15px]" />
                        </button>
                    )}
                </div>

                {/* Entreprise + Filtrer */}
                <div className="flex w-full sm:w-auto items-center gap-2">
                    <select
                        value={company}
                        onChange={(e) => handleCompanyChange(e.target.value)}
                        className="flex-1 sm:flex-none sm:min-w-[160px] h-9 sm:h-10 text-[11px] sm:text-sm border border-slate-200 rounded-lg px-2.5 sm:px-3 text-slate-600 bg-white outline-none transition-colors focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20"
                    >
                        <option value="">
                            Toutes les entreprises
                        </option>

                        {companies.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.nom}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={() => onFilter()}
                        className="h-9 sm:h-10 text-[11px] sm:text-sm font-medium text-white rounded-lg px-3 sm:px-4 whitespace-nowrap transition-opacity hover:opacity-90"
                        style={{ backgroundColor: COLORS.mid }}
                    >
                        Filtrer
                    </button>
                </div>
            </div>
        </div>
    );
}