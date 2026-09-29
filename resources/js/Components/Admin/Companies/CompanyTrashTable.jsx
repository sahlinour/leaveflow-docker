import { router } from "@inertiajs/react";
import { RotateCcw, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { COLORS } from "../../../theme";

export default function CompanyTrashTable({ companies = [] }) {
    const restore = (company) => {
        Swal.fire({
            title: "Restaurer l'entreprise ?",
            text: `"${company.nom}" sera restaurée.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Restaurer",
            cancelButtonText: "Annuler",
            confirmButtonColor: COLORS.approved,
        }).then(({ isConfirmed }) => {
            if (!isConfirmed) return;

            router.post(
                route("companies.restore", company.id),
                {},
                {
                    preserveScroll: true,
                }
            );
        });
    };

    const forceDelete = (company) => {
        Swal.fire({
            title: "Suppression définitive",
            text: `L'entreprise "${company.nom}" sera supprimée définitivement.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: COLORS.rejected,
            cancelButtonColor: COLORS.muted,
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler",
        }).then(({ isConfirmed }) => {
            if (!isConfirmed) return;

            router.delete(
                route("companies.forceDelete", company.id),
                {
                    preserveScroll: true,
                }
            );
        });
    };

    const initials = (name = "") =>
        name
            .split(" ")
            .filter(Boolean)
            .map((word) => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

    return (
        <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[650px] text-[11px] sm:text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 text-left text-slate-400">
                            <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                                Logo Entreprise
                            </th>

                            <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                                Entreprise
                            </th>

                            <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium">
                                Adresse
                            </th>

                            <th className="px-3 sm:px-5 py-2.5 sm:py-3 font-medium text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {companies.map((company) => (
                            <tr
                                key={company.id}
                                className="border-b border-slate-50 hover:bg-slate-50"
                            >
                                {/* Logo */}
                                <td className="px-3 sm:px-5 py-3 sm:py-4">
                                    {company.logo ? (
                                        <img
                                            src={`/storage/${company.logo}`}
                                            alt={company.nom}
                                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border border-slate-200"
                                        />
                                    ) : (
                                        <div
                                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-white font-semibold text-[10px] sm:text-sm"
                                            style={{
                                                backgroundColor: COLORS.mid,
                                            }}
                                        >
                                            {initials(company.nom)}
                                        </div>
                                    )}
                                </td>

                                {/* Nom */}
                                <td className="px-3 sm:px-5 py-3 sm:py-4 font-medium text-slate-800">
                                    {company.nom}
                                </td>

                                {/* Adresse */}
                                <td className="px-3 sm:px-5 py-3 sm:py-4 text-slate-600 max-w-[300px] truncate">
                                    {company.adresse ?? "—"}
                                </td>

                                {/* Actions */}
                                <td className="px-3 sm:px-5 py-3 sm:py-4">
                                    <div className="flex justify-end gap-3 sm:gap-4">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                restore(company)
                                            }
                                            className="text-emerald-600 hover:text-emerald-800 transition"
                                            title="Restaurer"
                                        >
                                            <RotateCcw
                                                size={15}
                                                className="sm:w-[18px] sm:h-[18px]"
                                            />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                forceDelete(company)
                                            }
                                            className="text-rose-600 hover:text-rose-800 transition"
                                            title="Supprimer définitivement"
                                        >
                                            <Trash2
                                                size={15}
                                                className="sm:w-[18px] sm:h-[18px]"
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}