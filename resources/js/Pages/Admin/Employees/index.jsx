import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Plus, ArchiveRestore } from "lucide-react";
import AdminLayout from "@/Layouts/LayoutAdmin";
import { COLORS } from "@/theme";
import EmployeeFilters from "@/Components/Admin/Employees/EmployeeFilters";
import EmployeeTable from "@/Components/Admin/Employees/EmployeeTable";
import Pagination from "@/Components/Common/Pagination";

export default function Index({
    employees = {},
    companies = [],
    filters = {},
    trashCount = 0,
}) {
    const search = filters.search ?? "";
    const company = filters.company ?? "";
    const employeeData = employees.data ?? [];

    const applyFilters = (next = {}) => {
        router.get(
            route("employees.index"),
            {
                search,
                company,
                ...next,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleDelete = (employee) => {
        Swal.fire({
            title: "Supprimer l'employé ?",
            text: `Voulez-vous supprimer "${employee.prenom} ${employee.nom}" ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: COLORS.rejected,
            cancelButtonColor: COLORS.muted,
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (!result.isConfirmed) return;

            router.delete(
                route("employees.destroy", employee.id),
                {
                    preserveScroll: true,

                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Supprimé !",
                            text: "Employé supprimé avec succès.",
                            timer: 1800,
                            showConfirmButton: false,
                        });
                    },
                }
            );
        });
    };

    return (
        <AdminLayout
            page="Employés"
            notificationCount={7}
        >
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
                <div>
                    <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl md:text-2xl">
                        Employés
                    </h1>

                    <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
                        {employees.total ?? 0} employé(s) trouvé(s)
                    </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">

                    {/* Corbeille */}
                    <Link
                        href={route("employees.trash")}
                        className="relative flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm font-medium border border-slate-200 bg-white text-slate-700 rounded-lg px-2.5 sm:px-4 py-2 sm:py-2.5 hover:bg-slate-50 transition"
                    >
                        <ArchiveRestore
                            size={13}
                            className="sm:w-4 sm:h-4"
                        />
                        Corbeille
                        {trashCount > 0 && (
                            <span className="ml-0.5 sm:ml-1 bg-red-500 text-white text-[9px] sm:text-xs font-semibold rounded-full px-1.5 sm:px-2 py-0.5">
                                {trashCount}
                            </span>
                        )}
                    </Link>

                    {/* Ajouter */}
                    <Link
                        href={route("employees.create")}
                        className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm font-medium text-white rounded-lg px-2.5 sm:px-4 py-2 sm:py-2.5 hover:opacity-90 transition"
                        style={{
                            backgroundColor: COLORS.dark,
                        }}
                    >
                        <Plus
                            size={13}
                            className="sm:w-4 sm:h-4"
                        />
                        Ajouter un employé
                    </Link>
                </div>
            </div>
            {/* Filtres */}
            <EmployeeFilters
                search={search}
                setSearch={() => {}}
                company={company}
                setCompany={() => {}}
                companies={companies}
                onFilter={applyFilters}
            />
            {/* Tableau */}
            <EmployeeTable
                employees={employeeData}
                onDelete={handleDelete}
            />
            <Pagination links={employees.links} />
        </AdminLayout>
    );
}