import DemandeActions from "./DemandeActions";

export default function DemandeTable({
    demandes = [],
    accepter,
    ouvrirRefus,
    voirCommentaire,
}) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-3 sm:px-5 py-3 border-b border-slate-100">
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                    Liste des demandes
                </p>

                <p className="text-[10px] sm:text-xs text-slate-400">
                    {demandes.length} demande(s)
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-[11px] sm:text-sm">
                    <thead>
                        <tr className="border-b text-left text-slate-500">
                            <th className="py-2.5 sm:py-3 px-3 sm:px-5">
                                Référence
                            </th>
                            <th>Employé</th>
                            <th>Type</th>
                            <th>Période</th>
                            <th>Jours</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {demandes.length > 0 ? (
                            demandes.map((demande) => (
                                <tr
                                    key={demande.id}
                                    className="border-b last:border-0 hover:bg-slate-50/50"
                                >
                                    <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-medium text-slate-700">
                                        {demande.reference_demande}
                                    </td>

                                    <td>
                                        {demande.user?.prenom}{" "}
                                        {demande.user?.nom}
                                    </td>

                                    <td>{demande.type_conge}</td>

                                    <td>
                                        <div>
                                            {formatDate(demande.date_debut)}
                                        </div>

                                        <div className="text-[10px] sm:text-xs text-slate-400">
                                            au {formatDate(demande.date_fin)}
                                        </div>
                                    </td>

                                    <td>
                                        {demande.nombre_jours} jour(s)
                                    </td>

                                    <td>
                                        <span
                                            className={statusClass(
                                                demande.statut
                                            )}
                                        >
                                            {demande.statut}
                                        </span>
                                    </td>

                                    <td className="px-5 py-3">
                                        <DemandeActions
                                            demande={demande}
                                            accepter={accepter}
                                            ouvrirRefus={ouvrirRefus}
                                            voirCommentaire={
                                                voirCommentaire
                                            }
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-8 text-[11px] sm:text-sm text-slate-400"
                                >
                                    Aucune demande trouvée
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("fr-FR");
}

function statusClass(status) {
    if (status === "Approuvée")
        return "px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs bg-green-100 text-green-700";

    if (status === "Refusée")
        return "px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs bg-red-100 text-red-700";

    return "px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs bg-yellow-100 text-yellow-700";
}