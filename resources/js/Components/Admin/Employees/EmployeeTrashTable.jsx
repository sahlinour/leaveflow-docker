import { RotateCcw, Trash2 } from "lucide-react";

export default function EmployeeTrashTable({ employees, onRestore, onForceDelete }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {employees.length === 0 ? (
                <div className="p-8 sm:p-10 text-center text-[11px] sm:text-sm text-slate-400">
                    La corbeille est vide.
                </div>
            ) : (
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[600px] text-[11px] sm:text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 text-left text-slate-400">
                                <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">Employé</th>
                                <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">Entreprise</th>
                                <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">Email</th>
                                <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id} className="border-b border-slate-50 hover:bg-slate-50">
                                    <td className="px-3 sm:px-5 py-3 sm:py-4 font-medium text-slate-700">
                                        {employee.prenom} {employee.nom}
                                    </td>

                                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-slate-600">
                                        {employee.company?.nom ?? "-"}
                                    </td>

                                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-slate-600">
                                        {employee.email}
                                    </td>

                                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                                        <div className="flex justify-end gap-3 sm:gap-4">
                                            <button
                                                onClick={() => onRestore(employee)}
                                                className="text-emerald-600 hover:text-emerald-800 transition"
                                                title="Restaurer"
                                            >
                                                <RotateCcw size={15} className="sm:w-[18px] sm:h-[18px]" />
                                            </button>

                                            <button
                                                onClick={() => onForceDelete(employee)}
                                                className="text-rose-600 hover:text-rose-800 transition"
                                                title="Supprimer définitivement"
                                            >
                                                <Trash2 size={15} className="sm:w-[18px] sm:h-[18px]" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
