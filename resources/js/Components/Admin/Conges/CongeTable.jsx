import CongeActions from "./CongeActions";
import CongeBalanceBadge from "./CongeBalanceBadge";
import CongeEmployee from "./CongeEmployee";

const headers = ["Employé", "Entreprise", "Année", "Solde", "Utilisés", "Restants", "Actions"];

export default function CongeTable({ conges, onDelete }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[850px] text-[11px] sm:text-sm">
                    <thead className="bg-slate-50">
                        <tr className="text-left text-[10px] sm:text-sm text-slate-600">
                            {headers.map((header) => (
                                <th key={header} className="px-3 sm:px-6 py-3 sm:py-4">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {!conges.length ? (
                            <tr>
                                <td colSpan="7" className="text-center py-8 sm:py-10 text-[11px] sm:text-sm text-slate-500">
                                    Aucun solde de congé trouvé.
                                </td>
                            </tr>
                        ) : (
                            conges.map((conge) => (
                                <tr key={conge.id} className="border-t border-slate-100 hover:bg-slate-50">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                                        <CongeEmployee user={conge.user} />
                                    </td>

                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-[11px] sm:text-sm text-slate-600">
                                        {conge.user.company?.nom ?? "-"}
                                    </td>

                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-[11px] sm:text-sm">
                                        {conge.annee}
                                    </td>

                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-[11px] sm:text-sm">
                                        {conge.solde_initial} jours
                                    </td>

                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-[11px] sm:text-sm">
                                        {conge.jours_utilise} jours
                                    </td>

                                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                                        <CongeBalanceBadge value={conge.jours_restants} />
                                    </td>

                                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                                        <CongeActions conge={conge} onDelete={onDelete} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}