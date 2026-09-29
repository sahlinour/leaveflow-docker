import { Search, RotateCcw } from "lucide-react";
import { COLORS } from "../../../theme";

export default function BankFilters({
    search,
    setSearch,
    companyFilter,
    setCompanyFilter,
    bankFilter,
    setBankFilter,
    companies = [],
    banks = [],
}) {
    const resetFilters = () => {
        setSearch("");
        setCompanyFilter("");
        setBankFilter("");
    };

    const hasFilters =
        search !== "" ||
        companyFilter !== "" ||
        bankFilter !== "";

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-4">
                <div className="lg:col-span-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher une entreprise, banque, compte..."
                            className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#2F6690] focus:ring-2 focus:ring-[#81C3D7]/30"
                        />
                    </div>
                </div>

                <div>
                    <select
                        value={companyFilter}
                        onChange={(e) => setCompanyFilter(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2F6690] focus:ring-2 focus:ring-[#81C3D7]/30"
                    >
                        <option value="">
                            Toutes les entreprises
                        </option>

                        {companies.map((company) => (
                            <option
                                key={company.id}
                                value={company.id}
                            >
                                {company.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <select
                        value={bankFilter}
                        onChange={(e) => setBankFilter(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2F6690] focus:ring-2 focus:ring-[#81C3D7]/30"
                    >
                        <option value="">
                            Toutes les banques
                        </option>

                        {banks.map((bank) => (
                            <option
                                key={bank.id}
                                value={bank.id}
                            >
                                {bank.nom}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {hasFilters && (
                <div className="mt-4 flex justify-end border-t border-slate-100 pt-4">
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />

                        Réinitialiser
                    </button>
                </div>
            )}
        </div>
    );
}