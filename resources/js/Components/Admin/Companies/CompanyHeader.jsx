import { Link } from "@inertiajs/react";
import { Plus, ArchiveRestore } from "lucide-react";
import { COLORS } from "../../../theme";

export default function CompanyHeader({ total, trashCount }) {
    return (
        <div className="flex flex-row items-center justify-between gap-2 mb-6 w-full">
            <div className="min-w-0 flex-1">
                <h1 className="truncate text-base font-bold text-slate-800 sm:text-lg md:text-xl lg:text-2xl">
                    Entreprises
                </h1>

                <p className="mt-0.5 truncate text-[10px] text-slate-400 sm:text-xs md:text-sm">
                    {total} entreprises gérées
                </p>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
                <Link
                    href={route("companies.trash")}
                    className="relative flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-sm font-medium border border-slate-200 bg-white text-slate-700 rounded-lg px-2 sm:px-2.5 md:px-4 py-2 sm:py-2.5 hover:bg-slate-50 transition whitespace-nowrap"
                >
                    <ArchiveRestore
                        size={13}
                        className="sm:w-4 sm:h-4"
                    />
                    <span>Corbeille</span>
                    {trashCount > 0 && (
                        <span className="ml-0.5 sm:ml-1 bg-red-500 text-white text-[9px] sm:text-xs font-semibold rounded-full px-1.5 sm:px-2 py-0.5">
                            {trashCount}
                        </span>
                    )}
                </Link>

                <Link
                    href={route("companies.create")}
                    className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-sm font-medium text-white rounded-lg px-2 sm:px-2.5 md:px-4 py-2 sm:py-2.5 hover:opacity-90 transition whitespace-nowrap"
                    style={{ backgroundColor: COLORS.dark }}
                >
                    <Plus
                        size={13}
                        className="sm:w-4 sm:h-4"
                    />
                    <span>Ajouter une entreprise</span>
                </Link>
            </div>
        </div>
    );
}
