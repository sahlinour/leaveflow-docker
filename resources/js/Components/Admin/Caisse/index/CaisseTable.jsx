import React from "react";
import { Users } from "lucide-react";

import CaisseEmployeeRow from "./CaisseEmployeeRow";

export default function CaisseTable({
    caisses = [],
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">

            {caisses.length === 0 ? (

                <div className="px-6 py-12 text-center">

                    <Users
                        size={42}
                        className="mx-auto text-slate-300"
                    />

                    <p className="mt-4 font-medium text-slate-700 dark:text-slate-300">
                        Aucun employé trouvé
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Aucun fond de caisse n'est disponible
                        pour cette date.
                    </p>

                </div>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                        <thead>

                            <tr className="bg-slate-50 text-left dark:bg-slate-700/50">

                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    Employé
                                </th>

                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    Fond de caisse
                                </th>

                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    Statut
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {caisses.map((caisse) => (

                                <CaisseEmployeeRow
                                    key={caisse.id}
                                    caisse={caisse}
                                />

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}