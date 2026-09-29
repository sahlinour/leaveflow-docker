import {Plus,CheckCircle2,XCircle,Pencil,Activity,} from "lucide-react";
import { COLORS } from "../../theme";

const ACTION_STYLES = {
    creation: {Icon: Plus,bg: "bg-blue-50",color: "text-blue-600",label: "a créé",},
    validation: {Icon: CheckCircle2,bg: "bg-emerald-50",color: "text-emerald-600",label: "a approuvé",},
    refus: {Icon: XCircle,bg: "bg-rose-50",color: "text-rose-500",label: "a refusé",},
    modification: {Icon: Pencil,bg: "bg-amber-50",color: "text-amber-600",label: "a modifié",},
};

const DEFAULT_STYLE = {
    Icon: Activity,
    bg: "bg-slate-100",
    color: "text-slate-500",
    label: "a effectué une action sur",
};

function initials(name = "") {
    return name
        .trim()
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

function formatDateTime(date) {
    const d = new Date(date);

    return (
        d.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }) +
        " à " +
        d.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        })
    );
}

export default function HistoriqueItem({ entry, isLast = false }) {
    const style = ACTION_STYLES[entry.action] ?? DEFAULT_STYLE;
    const { Icon, bg, color, label } = style;
    const acteur = entry.user
        ? `${entry.user.prenom} ${entry.user.nom}`
        : "Système";
    const concerne = entry.demande_conge?.user
        ? `${entry.demande_conge.user.prenom} ${entry.demande_conge.user.nom}`
        : null;
    const reference = entry.demande_conge?.reference_demande;

    return (
        <div className="flex gap-2.5 sm:gap-3 md:gap-4">
            <div className="flex shrink-0 flex-col items-center">
                <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-9 sm:w-9`}
                >
                    <div
                        className={`flex h-full w-full items-center justify-center rounded-full ${bg}`}
                    >
                        <Icon
                            size={14}
                            className={`${color} sm:h-4 sm:w-4`}
                        />
                    </div>
                </div>

                {!isLast && (
                    <div className="mt-1 w-px flex-1 bg-slate-100" />
                )}
            </div>

            <div className="min-w-0 flex-1 pb-5 sm:pb-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-x-3">
                    <p className="min-w-0 text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">
                        <span className="font-semibold text-slate-800">
                            {acteur}
                        </span>{" "}
                        {label}{" "}
                        {concerne ? (
                            <>
                                la demande de{" "}
                                <span className="font-medium text-slate-800">
                                    {concerne}
                                </span>
                            </>
                        ) : (
                            "une demande de congé"
                        )}
                        {reference && (
                            <span className="break-all text-slate-400">
                                {" "}
                                ({reference})
                            </span>
                        )}
                    </p>

                    <span className="shrink-0 text-[10px] text-slate-400 sm:text-xs">
                        {formatDateTime(entry.created_at)}
                    </span>
                </div>

                {(entry.ancien_statut || entry.nouveau_statut) && (
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px] sm:gap-2 sm:text-xs">
                        {entry.ancien_statut && (
                            <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-slate-500 sm:px-2">
                                {entry.ancien_statut}
                            </span>
                        )}

                        {entry.ancien_statut &&
                            entry.nouveau_statut && (
                                <span className="text-slate-300">
                                    →
                                </span>
                            )}

                        {entry.nouveau_statut && (
                            <span
                                className="rounded-full px-1.5 py-0.5 font-medium sm:px-2"
                                style={{
                                    backgroundColor: `${COLORS.mid}15`,
                                    color: COLORS.mid,
                                }}
                            >
                                {entry.nouveau_statut}
                            </span>
                        )}
                    </div>
                )}
                {entry.description && (
                    <p className="mt-1.5 break-words text-[10px] leading-4 text-slate-400 sm:text-xs sm:leading-5">
                        {entry.description}
                    </p>
                )}
            </div>
        </div>
    );
}
