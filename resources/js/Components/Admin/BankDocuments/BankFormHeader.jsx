import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

export default function BankFormHeader({ isEditing }) {
    return (
        <div className="flex items-center justify-between gap-3 sm:gap-4 sm:px-6 sm:py-5">
            <div className="min-w-0 flex-1">
                <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl md:text-2xl">
                    {isEditing
                        ? "Modifier la configuration bancaire"
                        : "Nouvelle configuration bancaire"}
                </h1>
                <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
                    Configurez les informations bancaires de
                    l'entreprise.
                </p>
            </div>

            <Link
                href={route("admin.bank-documents.index")}
                className="
                    inline-flex shrink-0 items-center justify-center gap-1.5
                    rounded-lg border border-slate-200 bg-white
                    px-3 py-2.5
                    text-xs font-semibold text-slate-600
                    transition hover:bg-slate-50

                    sm:gap-2
                    sm:px-4
                    sm:text-sm
                "
            >
                <ArrowLeft
                    size={15}
                    className="sm:h-[17px] sm:w-[17px]"
                />

                <span>Retour</span>
            </Link>
        </div>
    );
}