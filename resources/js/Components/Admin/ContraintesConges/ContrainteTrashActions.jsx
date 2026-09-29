import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { RotateCcw, Trash2 } from "lucide-react";
import { COLORS } from "../../../theme";

export default function ContrainteTrashActions({ company }) {
    const restore = () => {
        Swal.fire({
            title: "Restaurer l'entreprise ?",
            text: `"${company.nom}" sera restaurée.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Restaurer",
            cancelButtonText: "Annuler",
            confirmButtonColor: COLORS.approved,
        }).then(({ isConfirmed }) => {
            if (isConfirmed)
                router.post(route("companies.restore", company.id), {
                    preserveScroll: true,
                });
        });
    };

    const forceDelete = () => {
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
            if (isConfirmed)
                router.delete(route("companies.forceDelete", company.id), {
                    preserveScroll: true,
                });
        });
    };

    return (
        <div className="flex justify-end gap-4">
            <button
                onClick={restore}
                className="text-emerald-600 hover:text-emerald-800 transition"
                title="Restaurer"
            >
                <RotateCcw size={18} />
            </button>

            <button
                onClick={forceDelete}
                className="text-rose-600 hover:text-rose-800 transition"
                title="Supprimer définitivement"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}
