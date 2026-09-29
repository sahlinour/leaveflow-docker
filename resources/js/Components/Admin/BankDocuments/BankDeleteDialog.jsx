import { AlertTriangle, X } from "lucide-react";

export default function BankDeleteDialog({
    companyBank,
    onClose,
    onConfirm,
}) {
    if (!companyBank) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Supprimer la configuration
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5">
                    <div className="mb-4 flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                    </div>

                    <p className="text-center text-sm text-slate-600">
                        Voulez-vous vraiment supprimer la configuration
                        bancaire de{" "}
                        <strong className="font-semibold text-slate-900">
                            {companyBank.bank?.nom || "cette banque"}
                        </strong>
                        {" "}pour{" "}
                        <strong className="font-semibold text-slate-900">
                            {companyBank.company?.nom || "cette entreprise"}
                        </strong>
                        ?
                    </p>

                    {companyBank.template_path && (
                        <p className="mt-2 text-center text-xs text-red-500">
                            Le template Word associé sera également supprimé.
                        </p>
                    )}

                    <p className="mt-2 text-center text-xs text-slate-500">
                        La configuration sera déplacée vers la corbeille.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                        Annuler
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}