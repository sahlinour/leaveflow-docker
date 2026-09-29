import { Link } from "@inertiajs/react";
import { Pencil, X, Trash2, Download } from "lucide-react";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

export default function DemandeActions({ demande, onDelete }) {
    const handleAnnuler = () => {
        Swal.fire({
            title: "Annuler la demande ?",
            text: "La demande sera marquée comme annulée.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, annuler",
            cancelButtonText: "Retour",
            confirmButtonColor: "#f59e0b",
            cancelButtonColor: "#64748b",
        }).then(({ isConfirmed }) => {
            if (!isConfirmed) return;

            router.put(
                route("demandes-conges.annuler", demande.id),
                {},
                {
                    preserveScroll: true,
                }
            );
        });
    };

    return (
        <div className="flex items-center justify-center gap-1">

            {/* En attente : Modifier + Annuler */}
            {demande.statut === "En attente" && (
                <>
                    <Link
                        href={route(
                            "demandes-conges.edit",
                            demande.id
                        )}
                        className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100"
                        title="Modifier"
                    >
                        <Pencil
                            size={15}
                            className="sm:w-[17px] sm:h-[17px] text-blue-500"
                        />
                    </Link>

                    <button
                        type="button"
                        onClick={handleAnnuler}
                        className="p-1.5 sm:p-2 rounded-lg hover:bg-amber-50"
                        title="Annuler la demande"
                    >
                        <X
                            size={15}
                            className="sm:w-[17px] sm:h-[17px] text-amber-500"
                        />
                    </button>
                </>
            )}

            {/* Demande annulée : Supprimer */}
            {demande.statut === "Annulée" && (
                <button
                    type="button"
                    onClick={() => onDelete(demande.id)}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-rose-50"
                    title="Supprimer"
                >
                    <Trash2
                        size={15}
                        className="sm:w-[17px] sm:h-[17px] text-rose-500"
                    />
                </button>
            )}

            {/* Demande refusée : Supprimer */}
            {demande.statut === "Refusée" && (
                <button
                    type="button"
                    onClick={() => onDelete(demande.id)}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100"
                    title="Supprimer"
                >
                    <Trash2
                        size={15}
                        className="sm:w-[17px] sm:h-[17px] text-rose-500"
                    />
                </button>
            )}

            {/* Demande approuvée : Télécharger le PDF */}
            {demande.statut === "Approuvée" && (
                <a
                        href={route(
                            "demandes-conges.pdf",
                            demande.id
                        )}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                    >
                        <Download size={14} />
                    </a>
            )}
            
        </div>
    );
}
