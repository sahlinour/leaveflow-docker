import { RotateCcw, Trash2 } from "lucide-react";

export default function CongeTrashTable({ conges, onRestore, onForceDelete }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {conges.length === 0 ? (
                <div className="p-10 text-center text-slate-400">
                    La corbeille est vide.
                </div>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 text-left text-slate-400">
                            <th className="px-5 py-3">Employé</th>
                            <th className="px-5 py-3">Entreprise</th>
                            <th className="px-5 py-3">Solde Initial</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {conges.map((conge) => (
                            <tr
                                key={conge.id}
                                className="border-b border-slate-50 hover:bg-slate-50"
                            >
                                <td className="px-5 py-4 font-medium">
                                    {conge.user.prenom} {conge.user.nom}
                                </td>

                                <td className="px-5 py-4">
                                    {conge.user.company?.nom ?? "-"}
                                </td>

                                <td className="px-5 py-4">
                                    {conge.solde_initial} jours
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex justify-end gap-4">
                                        <button
                                            onClick={() => onRestore(conge)}
                                            className="text-emerald-600 hover:text-emerald-800 transition"
                                            title="Restaurer"
                                        >
                                            <RotateCcw size={18} />
                                        </button>

                                        <button
                                            onClick={() => onForceDelete(conge)}
                                            className="text-rose-600 hover:text-rose-800 transition"
                                            title="Supprimer définitivement"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
