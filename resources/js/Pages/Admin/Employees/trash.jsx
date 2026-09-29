import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "../../../Layouts/LayoutAdmin";
import { COLORS } from "../../../theme";
import EmployeeTrashTable from "../../../Components/Admin/Employees/EmployeeTrashTable";
import Pagination from "@/Components/Common/Pagination";

export default function Trash({ employees = {} }) {
    const employeeData = employees.data ?? [];

    const restore = (employee) => {
        Swal.fire({
            title: "Restaurer l'employé ?",
            text: `${employee.prenom} ${employee.nom} sera restauré.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Restaurer",
            cancelButtonText: "Annuler",
            confirmButtonColor: COLORS.approved,
        }).then(({ isConfirmed }) => {
            if (isConfirmed) router.post(route("employees.restore", employee.id));
        });
    };

    const forceDelete = (employee) => {
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
            if (isConfirmed) router.delete(route("employees.forceDelete", employee.id));
        });
    };

    return (
        <AdminLayout page="Corbeille">
            <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-slate-800">Corbeille</h1>
                    <p className="text-[10px] sm:text-sm text-slate-400">
                        {employees.total ?? 0} employé(s) supprimé(s)
                    </p>
                </div>

                <Link
                    href={route("employees.index")}
                    className="text-sm font-medium text-slate-500 hover:text-slate-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-sm whitespace-nowrap hover:opacity-90 transition"
                >
                    ← Retour aux employées
                </Link>
            </div>

            <EmployeeTrashTable
                employees={employeeData}
                onRestore={restore}
                onForceDelete={forceDelete}
            />
             <Pagination links={employees.links} />
        </AdminLayout>
    );
}
