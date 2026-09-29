
import DemandeStatusBadge from "./DemandeStatusBadge";
import DemandeActions from "./DemandeActions";

export default function DemandeTable({
    demandes = [],
    onDelete,
}) {
    return (

        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto w-full">
            <table className="w-full min-w-[700px] text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b">
                    <tr>
                        <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-slate-600 whitespace-nowrap">
                            Référence
                        </th>
                        <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-slate-600 whitespace-nowrap">
                            Type
                        </th>
                        <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-slate-600 whitespace-nowrap">
                            Période
                        </th>
                        <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-slate-600 whitespace-nowrap">
                            Jours
                        </th>
                        <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-slate-600 whitespace-nowrap">
                            Statut
                        </th>
                        <th className="text-center px-3 sm:px-5 py-3 sm:py-4 text-slate-600 whitespace-nowrap">
                            Actions
                        </th>

                    </tr>
                </thead>
                <tbody >
                    {demandes.length > 0 ? (
                        demandes.map((demande) => (
                            <tr
                                key={demande.id}
                                className="border-b hover:bg-slate-50"
                            >
                                {/* Référence */}
                                <td className="px-3 sm:px-5 py-3 sm:py-4 font-medium text-slate-700 whitespace-nowrap">
                                    {demande.reference_demande}
                                </td>
                                {/* Type */}
                                <td className="px-3 sm:px-5 py-3 sm:py-4 text-slate-600 whitespace-nowrap">
                                    {demande.type_conge}
                                </td>
                                {/* Période */}
                                <td className="px-3 sm:px-5 py-3 sm:py-4 text-slate-600 whitespace-nowrap">
                                    <div>
                                        {new Date(
                                            demande.date_debut
                                        ).toLocaleDateString("fr-FR")}
                                    </div>
                                    <div>
                                        au{" "}
                                        {new Date(
                                            demande.date_fin
                                        ).toLocaleDateString("fr-FR")}
                                    </div>
                                </td>
                                {/* Nombre de jours */}
                                <td className="px-3 sm:px-5 py-3 sm:py-4 text-slate-600 whitespace-nowrap">
                                    {demande.nombre_jours} jour(s)
                                </td>
                                {/* Statut */}
                                <td className="px-3 sm:px-5 py-3 sm:py-4 whitespace-nowrap">
                                    <DemandeStatusBadge
                                        statut={demande.statut}
                                    />
                                </td>
                                {/* Actions */}
                                <td className="px-3 sm:px-5 py-3 sm:py-4">
                                    <DemandeActions
                                        demande={demande}
                                        onDelete={onDelete}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="6"
                                className="text-center py-8 text-xs sm:text-sm text-slate-400"
                            >
                                Aucune demande trouvée
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
