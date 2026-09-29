import { Link } from "@inertiajs/react";
import { ClipboardList } from "lucide-react";
import { COLORS } from "../../../theme";

export default function RecentRequestsCard({ demandes = [], voirToutHref = "/employe/conges" }) {
    return (
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-800">Mes demandes récentes</h2>
                <Link href={route("demandes-conges.index")} className="text-sm font-medium" style={{ color: COLORS.mid }}>
                    Voir tout
                </Link>
            </div>

            {demandes.length === 0 ? (
                <div className="py-10 text-center">
                    <ClipboardList size={28} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-sm text-slate-400">Aucune demande pour le moment.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {demandes.map((demande) => (
                        <div
                            key={demande.id}
                            className="flex items-center justify-between border border-slate-100 rounded-lg px-4 py-3"
                        >
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-800">{demande.type}</p>
                                <p className="text-xs text-slate-400 truncate">
                                    {demande.reference && <>{demande.reference} · </>}
                                    {demande.dateDebut} → {demande.dateFin} · {demande.nombreJours} jour(s)
                                </p>
                            </div>
                            <StatutBadge statut={demande.statut} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function StatutBadge({ statut }) {
    const styles = {
        "En attente": "bg-amber-50 text-amber-600",
        "Approuvée": "bg-emerald-50 text-emerald-700",
        "Refusée": "bg-rose-50 text-rose-600",
    };
    return (
        <span className={`text-xs font-medium rounded-full px-2.5 py-1 shrink-0 ${styles[statut] ?? "bg-slate-100 text-slate-600"}`}>
            {statut}
        </span>
    );
}