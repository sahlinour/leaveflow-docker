export default function PeriodeItem({ periode, onDelete }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5">
            <div>
                <p className="font-semibold text-slate-800">
                    {new Date(periode.date_debut).toLocaleDateString("fr-FR")} →{" "}
                    {new Date(periode.date_fin).toLocaleDateString("fr-FR")}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                    {periode.motif || "Période non disponible"}
                </p>
            </div>

            <button type="button" onClick={() => onDelete(periode.id)}
                className="px-3 py-2 text-sm rounded-lg border border-red-200 text-red-500 hover:bg-red-50">
                Supprimer
            </button>
        </div>
    );
}