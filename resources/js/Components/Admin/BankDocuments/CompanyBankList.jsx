import {Building2,CreditCard,Pencil,Trash2,} from "lucide-react";
import { COLORS } from "../../../theme";

export default function CompanyBankList({
    companyBanks = [],
    onEdit,
    onDelete,
    canManage = true,
}) {
    if (!companyBanks.length) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <Building2 className="mx-auto h-10 w-10 text-slate-300" />

                <p className="mt-3 text-sm font-medium text-slate-600">
                    Aucune configuration bancaire trouvée.
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    Modifiez vos critères de recherche ou ajoutez une banque.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] text-left">

                    {/* HEADER DU TABLEAU */}
                    <thead className="border-b border-slate-200 bg-slate-50">
                        <tr>
                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Entreprise
                            </th>

                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Banque
                            </th>

                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                N° compte
                            </th>

                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Bénéficiaire
                            </th>

                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Compte bénéficiaire
                            </th>

                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Ville
                            </th>

                            {/* Colonne Actions uniquement pour Admin */}
                            {canManage && (
                                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>

                    {/* CORPS DU TABLEAU */}
                    <tbody className="divide-y divide-slate-100">
                        {companyBanks.map((companyBank) => (
                            <tr
                                key={companyBank.id}
                                className="transition hover:bg-slate-50"
                            >
                                {/* Entreprise */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-slate-800">
                                            {companyBank.company?.nom || "-"}
                                        </span>
                                    </div>
                                </td>

                                {/* Banque */}
                                <td className="px-5 py-4">
                                    <span className="text-sm font-medium text-slate-700">
                                        {companyBank.bank?.nom || "-"}
                                    </span>
                                </td>

                                {/* N° compte */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-slate-400" />

                                        <span className="text-sm text-slate-700">
                                            {companyBank.numero_compte || "-"}
                                        </span>
                                    </div>
                                </td>

                                {/* Bénéficiaire */}
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-700">
                                        {companyBank.nom_beneficiaire || "-"}
                                    </span>
                                </td>

                                {/* Compte bénéficiaire */}
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-700">
                                        {companyBank.numero_compte_beneficiaire || "-"}
                                    </span>
                                </td>

                                {/* Ville */}
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-700">
                                        {companyBank.ville || "-"}
                                    </span>
                                </td>

                                {/* Actions uniquement pour Admin */}
                                {canManage && (
                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-1">

                                            {/* Modifier */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onEdit(companyBank)
                                                }
                                                title="Modifier"
                                                className="rounded-lg p-2 transition hover:bg-slate-100"
                                                style={{
                                                    color: COLORS.mid,
                                                }}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>

                                            {/* Supprimer */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDelete(companyBank)
                                                }
                                                title="Supprimer"
                                                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>

                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Nombre de configurations */}
            <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">
                <p className="text-xs text-slate-500">
                    {companyBanks.length} configuration
                    {companyBanks.length > 1 ? "s" : ""} bancaire
                    {companyBanks.length > 1 ? "s" : ""}
                </p>
            </div>
        </div>
    );
}