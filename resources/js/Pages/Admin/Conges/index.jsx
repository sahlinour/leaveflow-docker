import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";

import AdminLayout from "../../../Layouts/LayoutAdmin";
import { COLORS } from "../../../theme";
import CongeFilters from "../../../Components/Admin/Conges/CongeFilters";
import CongeTable from "../../../Components/Admin/Conges/CongeTable";
import Pagination from "@/Components/Common/Pagination";

export default function Index({
    conges = {},
    employees = [],
    filters = {},
    trashCount = 0,
}) {
    const congeData = conges.data ?? [];

    const [state, setState] = useState({
        search: filters.search || "",
        employee: filters.employee || "",
        annee: filters.annee || "",
    });

    const handleFilter = (key, value) => {
        const next = { ...state, [key]: value };

        setState(next);

        router.get(route("conges.index"), next, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (conge) => {
        Swal.fire({
            title: "Supprimer ce solde ?",
            text: `Supprimer le solde de ${conge.user.prenom} ${conge.user.nom} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: COLORS.rejected,
            cancelButtonColor: COLORS.muted,
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler",
        }).then(({ isConfirmed }) => {
            if (!isConfirmed) return;

            router.delete(route("conges.destroy", conge.id), {
                preserveScroll: true,
                onSuccess: () =>
                    Swal.fire({
                        icon: "success",
                        title: "Supprimé !",
                        text: "Solde supprimé avec succès.",
                        timer: 1800,
                        showConfirmButton: false,
                    }),
            });
        });
    };

    return (
        <AdminLayout page="Congés" notificationCount={7}>
            <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div>
                    <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl md:text-2xl">
                        Solde des congés
                    </h1>

                     <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
                        {conges.total ?? 0} soldes enregistrés
                    </p>
                </div>

                <Link
                    href={route("conges.create")}
                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-white text-[10px] sm:text-sm font-medium"
                    style={{ backgroundColor: COLORS.dark }}
                >
                    <Plus
                        size={14}
                        className="sm:w-[17px] sm:h-[17px]"
                    />
                    Ajouter un solde
                </Link>
            </div>

            <CongeFilters
                {...state}
                employees={employees}
                onChange={handleFilter}
            />

            <CongeTable
                conges={congeData}
                onDelete={handleDelete}
            />

            <Pagination
                links={conges.links ?? []}
            />
        </AdminLayout>
    );
}