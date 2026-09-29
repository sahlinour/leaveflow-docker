import { Link } from "@inertiajs/react";
import { Check, X, Eye, Download, MessageCircle } from "lucide-react";
import { COLORS } from "@/theme";

export default function DemandeActions({
    demande,
    accepter,
    ouvrirRefus,
    voirCommentaire,
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">

            {demande.statut === "En attente" && (
                <>
                    <button
                        onClick={() => accepter(demande)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition"
                    >
                        <Check size={14} />
                        Accepter
                    </button>

                    <button
                        onClick={() => ouvrirRefus(demande)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-rose-100 text-rose-700 hover:bg-rose-200 transition"
                    >
                        <X size={14} />
                        Refuser
                    </button>
                </>
            )}

            {demande.statut === "Approuvée" && (
                <>
                    <Link
                        href={route(
                            "admin.demandes-conges.pdf",
                            demande.id
                        )}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                    >
                        <Eye size={14} />
                        Voir
                    </Link>

                    <a
                        href={route(
                            "admin.demandes-conges.download",
                            demande.id
                        )}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                    >
                        <Download size={14} />
                        Télécharger
                    </a>
                </>
            )}

            {demande.statut === "Refusée" && (
                <button
                    onClick={() => voirCommentaire(demande)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-rose-100 text-rose-700 hover:bg-rose-200 transition"
                >
                    <MessageCircle size={14} />
                    Commentaire
                </button>
            )}

        </div>
    );
}