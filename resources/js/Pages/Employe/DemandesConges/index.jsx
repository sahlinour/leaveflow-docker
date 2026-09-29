import { Link, router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";
import LayoutEmploye from "../../../Layouts/Employeelayout";
import { COLORS } from "../../../theme";
import DemandeTable from "../../../Components/Employee/DemandeIndex/DemandeTable";
import Pagination from "@/Components/Common/Pagination";

export default function Index({ demandes = {} }) {

    const demandesData = demandes.data ?? [];
    function handleDelete(id) {
        Swal.fire({
            title: "Supprimer la demande ?",
            text: "Cette action déplacera la demande vers la corbeille.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    route("demandes-conges.destroy", id)
                );
            }
        });
    }

    return (
        <LayoutEmploye page="Demandes de congés">
            
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">

                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-slate-800">
                        Mes demandes de congé
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-400">
                        Consulter l'historique de vos demandes
                    </p>
                </div>
                <Link
                    href={route("demandes-conges.create")}
                    className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white rounded-lg px-3 sm:px-4 py-2 sm:py-2.5"
                    style={{
                        backgroundColor: COLORS.dark,
                    }}
                >
                    <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Nouvelle demande
                </Link>
            </div>
      
            <DemandeTable
                demandes={demandesData}
                onDelete={handleDelete}
            />
            <Pagination
                links={demandes.links ?? []}
            />
        </LayoutEmploye>
    );
}
