import { Search } from "lucide-react";

export default function CongeFilters({
    search,
    employee,
    annee,
    employees,
    onChange,
}) {
    const update = (key, value) => onChange(key, value);

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-5 mb-4 sm:mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                <div className="relative">
                    <Search
                        size={14}
                        className="sm:w-[18px] sm:h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => update("search", e.target.value)}
                        placeholder="Rechercher un employé..."
                        className="w-full h-9 sm:h-10 border border-slate-300 rounded-lg pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-[11px] sm:text-sm focus:outline-none focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20"
                    />
                </div>

                <select
                    value={employee}
                    onChange={(e) => update("employee", e.target.value)}
                    className="w-full h-9 sm:h-10 border border-slate-300 rounded-lg px-2.5 sm:px-4 py-2 text-[11px] sm:text-sm text-slate-600 bg-white focus:outline-none focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20"
                >
                    <option value="">Tous les employés</option>
                    {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                            {emp.prenom} {emp.nom}
                        </option>
                    ))}
                </select>

                <select
                    value={annee}
                    onChange={(e) => update("annee", e.target.value)}
                    className="w-full h-9 sm:h-10 border border-slate-300 rounded-lg px-2.5 sm:px-4 py-2 text-[11px] sm:text-sm text-slate-600 bg-white focus:outline-none focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20"
                >
                    <option value="">Toutes les années</option>
                    {[2024, 2025, 2026, 2027, 2028].map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}