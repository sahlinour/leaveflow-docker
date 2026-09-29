import { ChevronDown } from "lucide-react";

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => currentYear - i);

export default function DashboardHeader({ year, loading, onYearChange }) {
    return (
        <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
               <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl md:text-2xl">
                    Vue d'ensemble
                </h1>
                 <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
                    Statistiques pour l'année {year}
                </p>
            </div>

            <div className="relative">
                <select
                    value={year}
                    onChange={(e) => onYearChange(Number(e.target.value))}
                    disabled={loading}
                    className="appearance-none text-sm font-medium border border-slate-200 rounded-lg pl-4 pr-9 py-2 text-slate-700 bg-white outline-none transition-all focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 disabled:opacity-60 cursor-pointer"
                >
                    {YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

                <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
            </div>
        </div>
    );
}
