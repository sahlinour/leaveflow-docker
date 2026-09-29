import { useState } from "react";
import { router } from "@inertiajs/react";

function ShowDemandeDialog({ open, handleOpen, demande }) {

    const [commentaire, setCommentaire] = useState(demande?.commentaire_admin || "");

    if (!open || !demande) return null;
    function saveCommentaire() {

        // si vide on ne change rien
        if (commentaire.trim() === "") {
            handleOpen();
            return;
        }


        router.put(
            route("demandes.commentaire", demande.id),
            {
                commentaire_admin: commentaire
            },
            {
                onSuccess: () => {
                    handleOpen();
                }
            }
        );}

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-lg font-semibold">
                        Détails de la demande
                    </h2>

                    <button
                        onClick={() => handleOpen()}
                        className="text-2xl text-slate-500"
                    >
                        ×
                    </button>

                </div>

                <div className="p-6 space-y-3">

                    <p><b>Référence :</b> {demande.reference_demande}</p>

                    <p>
                        <b>Employé :</b>{" "}
                        {demande.user?.prenom} {demande.user?.nom}
                    </p>

                    <p><b>Type :</b> {demande.type_conge}</p>

                    <p>
                        <b>Période :</b>{" "}
                        {formatDate(demande.date_debut)}
                        {" → "}
                        {formatDate(demande.date_fin)}
                    </p>

                    <p><b>Nombre de jours :</b> {demande.nombre_jours}</p>

                    <p><b>Statut :</b> {demande.statut}</p>
                    <p><b>Date d'envoi :</b>{" "}
                        {formatDate(demande.created_at)}
                    </p>

                    <p><b>Commantaire :</b></p>

                        <textarea
                            rows={2}
                            value={commentaire}
                            onChange={(e) => setCommentaire(e.target.value)}
                            className="
                                w-full
                                rounded-lg
                                border
                                border-slate-300
                                p-3
                                outline-none
                                focus:border-blue-500
                            "
                            placeholder="Ajouter un commentaire..."
                        />
                    

               

                </div>

                <div className="flex justify-end border-t p-4">

                    <button
                        onClick={() => handleOpen()}
                        className="px-5 py-2 rounded-lg bg-slate-800 text-white"
                    >
                        Fermer
                    </button>
                     <button
                        onClick={saveCommentaire}
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white"
                    >
                        Enregistrer
                    </button>

                </div>

            </div>

        </div>

    );

}

function Info({ label, value }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-1 font-semibold text-slate-800">
                {value}
            </p>
        </div>
    );
}

function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("fr-FR");
}

function statusClass(status) {

    if (status === "Approuvée")
        return "inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700";

    if (status === "Refusée")
        return "inline-flex px-4 py-2 rounded-full bg-red-100 text-red-700";

    return "inline-flex px-4 py-2 rounded-full bg-yellow-100 text-yellow-700";
}

export default ShowDemandeDialog;