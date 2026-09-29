import { COLORS } from "../../../theme";

export default function ClientFormActions({processing,isEdit = false,}) 
{
    return (
        <div
            className="px-6 py-4 border-t border-slate-200 flex flex-col-reverse sm:flex-row sm:justify-end gap-3"
        >
            <button
                type="button"
                onClick={() => window.history.back()}
                disabled={processing}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium transition hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Annuler
            </button>

            <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-white text-sm font-medium transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                    backgroundColor: COLORS.dark,
                }}
            >
                {processing
                    ? "Enregistrement..."
                    : isEdit
                    ? "Modifier le client"
                    : "Créer le client"}
            </button>
        </div>
    );
}
