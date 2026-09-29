import EmployeeAvatar from "./EmployeeAvatar";
import EmployeeLeaveBalance from "./EmployeeLeaveBalance";
import EmployeeStatusBadge from "./EmployeeStatusBadge";
import EmployeeActions from "./EmployeeActions";

export default function EmployeeTable({ employees, onDelete }) {
    if (employees.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-10 text-center text-[11px] sm:text-sm text-slate-400">
                Aucun employé trouvé.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
            <table className="w-full min-w-[900px] text-[11px] sm:text-sm">

                <thead>
                    <tr className="border-b border-slate-100 text-left text-slate-400">
                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Employé
                        </th>

                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Entreprise
                        </th>

                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Poste
                        </th>

                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Date d'embauche
                        </th>

                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Solde de congés
                        </th>

                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                            Statut
                        </th>

                        <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium text-right">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee) => (
                        <tr
                            key={employee.id}
                            className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                        >
                            {/* Employé */}
                            <td className="px-3 sm:px-5 py-2.5 sm:py-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <EmployeeAvatar employee={employee} />

                                    <div>
                                        <p className="font-medium text-[11px] sm:text-sm text-slate-800 leading-tight">
                                            {employee.prenom} {employee.nom}
                                        </p>

                                        <p className="text-[9px] sm:text-xs text-slate-400">
                                            {employee.email}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            {/* Entreprise */}
                            <td className="px-3 sm:px-5 py-2.5 sm:py-3 text-slate-600">
                                {employee.company?.nom ?? "—"}
                            </td>

                            {/* Poste */}
                            <td className="px-3 sm:px-5 py-2.5 sm:py-3 text-slate-600">
                                {employee.poste ?? "—"}
                            </td>

                            {/* Date */}
                            <td className="px-3 sm:px-5 py-2.5 sm:py-3 text-slate-600">
                                {employee.date_embauche ? (
                                    <div>
                                        <div>
                                            {new Date(
                                                employee.date_embauche
                                            ).toLocaleDateString("fr-FR")}
                                        </div>

                                        <div className="text-[9px] sm:text-xs text-slate-400">
                                            {new Date(
                                                employee.date_embauche
                                            ).toLocaleTimeString("fr-FR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    "—"
                                )}
                            </td>

                            {/* Solde */}
                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                                <EmployeeLeaveBalance employee={employee} />
                            </td>

                            {/* Statut */}
                            <td className="px-3 sm:px-5 py-2.5 sm:py-3">
                                <EmployeeStatusBadge
                                    status={employee.statut}
                                />
                            </td>

                            {/* Actions */}
                            <td className="px-3 sm:px-5 py-2.5 sm:py-3">
                                <EmployeeActions
                                    employee={employee}
                                    onDelete={onDelete}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}