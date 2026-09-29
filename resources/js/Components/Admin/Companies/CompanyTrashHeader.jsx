import { Link } from "@inertiajs/react";

export default function CompanyTrashHeader({ count = 0 }) {
    return (
        <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-800">
                    Corbeille
                </h1>

                <p className="text-[10px] sm:text-sm text-slate-400">
                    {count} entreprise(s) supprimée(s)
                </p>
            </div>

            <Link
                href={route("companies.index")}
                className="text-[10px] sm:text-sm font-medium text-slate-500 hover:text-slate-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg whitespace-nowrap hover:bg-slate-50 transition"
            >
                ← Retour aux entreprises
            </Link>
        </div>
    );
}