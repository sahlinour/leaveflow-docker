import React from "react";
import CompteCourantAssocieRow from "./CompteCourantAssocieRow";

export default function CompteCourantAssocieTable({
    comptes = [],
}) {
    return (
        <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            {comptes.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 sm:p-10 sm:text-sm">
                    Aucun compte courant associé trouvé.
                </div>
            ) : (
                <table className="w-full min-w-[900px] text-[11px] sm:text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 text-left text-slate-400">
                            <th className="px-3 py-2.5 font-medium sm:px-5 sm:py-3">
                                Montant affecté
                            </th>

                            <th className="px-3 py-2.5 font-medium sm:px-5 sm:py-3">
                                Montant retourné
                            </th>

                            <th className="px-3 py-2.5 font-medium sm:px-5 sm:py-3">
                                Montant restant
                            </th>

                            <th className="px-3 py-2.5 font-medium sm:px-5 sm:py-3">
                                Statut
                            </th>

                            <th className="px-3 py-2.5 font-medium sm:px-5 sm:py-3">
                                Date d'affectation
                            </th>

                            <th className="px-3 py-2.5 font-medium sm:px-5 sm:py-3">
                                Date de retour
                            </th>

                            <th className="px-3 py-2.5 font-medium sm:px-5 sm:py-3">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {comptes.data.map((compte) => (
                            <CompteCourantAssocieRow
                                key={compte.id}
                                compte={compte}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}