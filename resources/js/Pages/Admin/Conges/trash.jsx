import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "../../../Layouts/LayoutAdmin";
import { COLORS } from "../../../theme";
import CongeTrashTable from "../../../Components/Admin/Conges/CongeTrashTable";

export default function Trash({ employees = [] }) {
    const restore = (conge) => {
        Swal.fire({
            title: "Restaurer le congé ?",
            text: `${conge.user.prenom} ${conge.user.nom} sera restauré.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Restaurer",
            cancelButtonText: "Annuler",
            confirmButtonColor: COLORS.approved,
        }).then(({ isConfirmed }) => {
            if (isConfirmed) router.post(route("conges.restore", conge.id));
        });
    };

    const forceDelete = (conge) => {
        Swal.fire({
            title: "Suppression définitive",
            text: "Cette action est irréversible.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: COLORS.rejected,
            cancelButtonColor: COLORS.muted,
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) router.delete(route("conges.forceDelete", conge.id));
        });
    };

    return (
        <AdminLayout page="Corbeille">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Corbeille</h1>
                    <p className="text-sm text-slate-400">
                        {employees.length} congé(s) supprimé(s)
                    </p>
                </div>

                <Link
                    href={route("conges.index")}
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: COLORS.dark }}
                >
                    Retour aux congés
                </Link>
            </div>

            <CongeTrashTable
                conges={employees}
                onRestore={restore}
                onForceDelete={forceDelete}
            />
        </AdminLayout>
    );
}
