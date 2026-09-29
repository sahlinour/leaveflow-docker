import { Building2 } from "lucide-react";

export default function ContrainteTrashEmpty() {
    return (
        <div className="p-12 flex flex-col items-center justify-center">
            <Building2 size={48} className="text-slate-300 mb-3" />

            <h3 className="text-lg font-semibold text-slate-700">
                Corbeille vide
            </h3>

            <p className="text-sm text-slate-400 mt-1">
                Aucune entreprise supprimée.
            </p>
        </div>
    );
}
