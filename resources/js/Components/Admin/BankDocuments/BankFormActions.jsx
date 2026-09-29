import { router } from "@inertiajs/react";
import { COLORS } from "../../../theme";

export default function BankFormActions({processing,isEditing,}) 
{
    const cancel = () => {
        router.visit(
            route("admin.bank-documents.index")
        );
    };

    return (
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 p-6 sm:flex-row sm:justify-end">
            <button
                type="button"
                onClick={cancel}
                disabled={processing}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
                Annuler
            </button>

            <button
                type="submit"
                disabled={processing}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                    backgroundColor: COLORS.dark,
                }}
            >
                {processing
                    ? "Enregistrement..."
                    : isEditing
                    ? "Enregistrer les modifications"
                    : "Enregistrer"}
            </button>
        </div>
    );
}