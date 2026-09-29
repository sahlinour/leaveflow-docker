import { Building2 } from "lucide-react";

export default function CompanyTrashEmpty() {
    return (
        <div className="p-8 sm:p-12 flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200">
            <Building2
                size={36}
                className="sm:w-12 sm:h-12 text-slate-300 mb-2 sm:mb-3"
            />

            <h3 className="text-sm sm:text-lg font-semibold text-slate-700">
                Corbeille vide
            </h3>

            <p className="text-[10px] sm:text-sm text-slate-400 mt-1 text-center">
                Aucune entreprise supprimée.
            </p>
        </div>
    );
}