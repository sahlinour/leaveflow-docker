import { router } from "@inertiajs/react";
import { useState } from "react";
import LayoutAdmin from "../../../Layouts/LayoutAdmin";
import DemandeFilters from "@/Components/Admin/DemandesConges/DemandeFilters";
import DemandeTable from "@/Components/Admin/DemandesConges/DemandeTable";
import CommentModal from "@/Components/Admin/DemandesConges/CommentModal";
import Pagination from "@/Components/Common/Pagination";

export default function Index({
    demandes = {},
    filters = {},
    counts = {},
}) {
    const [showComment, setShowComment] = useState(false);
    const [selectedDemande, setSelectedDemande] = useState(null);
    const [commentaire, setCommentaire] = useState("");
    const demandeData = demandes.data ?? [];
    
    function accepter(demande) {
        router.put(
            route("admin.demandes-conges.update", demande.id),
            {
                statut: "Approuvée",
            },
            {
                preserveScroll: true,
            }
        );
    }

    function ouvrirRefus(demande) {
        setSelectedDemande(demande);
        setCommentaire("");
        setShowComment(true);
    }

    function voirCommentaire(demande) {
        setSelectedDemande(demande);
        setCommentaire(demande.commentaire_admin || "");
        setShowComment(true);
    }

    function fermerCommentaire() {
        setShowComment(false);
        setSelectedDemande(null);
        setCommentaire("");
    }

    function confirmerRefus(e) {
        e.preventDefault();

        if (!selectedDemande || !commentaire.trim()) {
            return;
        }

        router.put(
            route(
                "admin.demandes-conges.update",
                selectedDemande.id
            ),
            {
                statut: "Refusée",
                commentaire_admin: commentaire.trim(),
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    fermerCommentaire();
                },
            }
        );
    }

    return (
        <LayoutAdmin page="Demandes de congés">
            <div className="mb-4 sm:mb-5">
                <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl md:text-2xl">
                    Gestion des demandes de congés
                </h1>

                <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
                    Consulter et traiter les demandes des employés
                </p>
            </div>

            <DemandeFilters
                filters={filters}
                counts={counts}
            />

            <DemandeTable
                demandes={demandeData}
                accepter={accepter}
                ouvrirRefus={ouvrirRefus}
                voirCommentaire={voirCommentaire}
            />

             <Pagination
                links={demandes.links ?? []}
            />

            <CommentModal
                open={showComment}
                demande={selectedDemande}
                commentaire={commentaire}
                setCommentaire={setCommentaire}
                confirmerRefus={confirmerRefus}
                fermer={fermerCommentaire}
            />
        </LayoutAdmin>
    );
}