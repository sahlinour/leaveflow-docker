export default function CompteCourantAssocieTable({ comptes }) {
    if (comptes.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-10 text-center text-[11px] sm:text-sm text-slate-400">
                Aucun compte courant associé trouvé.
            </div>
        );
    }

    const formatMontant = (montant) => {
        return `${Number(montant ?? 0).toLocaleString("fr-FR")} DH`;
    };

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString("fr-FR");
    };

    const getStatut = (statut) => {
        switch (statut) {
            case "actif":
                return "Actif";

            case "retour_partiel":
                return "Retour partiel";

            case "retourne":
                return "Retourné";

            default:
                return "—";
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
            <table className="w-full min-w-[1000px] text-[11px] sm:text-sm">
                <thead>
                    <tr className="border-b border-slate-100 text-left text-slate-400">
                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Employé
                        </th>

                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Montant affecté
                        </th>

                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Montant retourné
                        </th>

                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Montant restant
                        </th>

                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Statut
                        </th>

                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Date d'affectation
                        </th>

                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Date de retour
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {comptes.map((compte) => {
                        const montant = Number(compte.montant ?? 0);

                        const montantRetourne = Number(
                            compte.montant_retourne ?? 0
                        );

                        const montantRestant =
                            montant - montantRetourne;

                        return (
                            <tr
                                key={compte.id}
                                className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                            >
                                {/* Employé */}
                                <td className="px-3 sm:px-5 py-2.5 sm:py-3">
                                    <div>
                                        <p className="font-medium text-[11px] sm:text-sm text-slate-800">
                                            {compte.user?.prenom}{" "}
                                            {compte.user?.nom}
                                        </p>

                                        <p className="text-[9px] sm:text-xs text-slate-400">
                                            {compte.user?.email ?? "—"}
                                        </p>
                                    </div>
                                </td>

                                {/* Montant affecté */}
                                <td className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium text-slate-700">
                                    {formatMontant(montant)}
                                </td>

                                {/* Montant retourné */}
                                <td className="px-3 sm:px-5 py-2.5 sm:py-3 text-slate-600">
                                    {formatMontant(montantRetourne)}
                                </td>

                                {/* Montant restant */}
                                <td className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium text-slate-700">
                                    {formatMontant(montantRestant)}
                                </td>

                                {/* Statut */}
                                <td className="px-3 sm:px-5 py-2.5 sm:py-3">
                                    <span className="text-[10px] sm:text-xs font-medium">
                                        {getStatut(compte.statut)}
                                    </span>
                                </td>

                                {/* Date d'affectation */}
                                <td className="px-3 sm:px-5 py-2.5 sm:py-3 text-slate-600">
                                    {formatDate(
                                        compte.date_affectation
                                    )}
                                </td>

                                {/* Date de retour */}
                                <td className="px-3 sm:px-5 py-2.5 sm:py-3 text-slate-600">
                                    {formatDate(
                                        compte.date_retour
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}