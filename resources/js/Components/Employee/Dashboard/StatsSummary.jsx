import { Clock, CheckCircle2, XCircle,FileText } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { COLORS } from "../../../theme";

export default function StatsSummary({ solde = 0, counts = {} }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

           {/* Solde de congés */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    
                    <p className="text-sm text-slate-500">
                        Solde de congés
                    </p>

                    <div
                        className="h-9 w-9 rounded-lg flex items-center justify-center bg-slate-100"
                        style={{ color: COLORS.dark }}
                    >
                        <CalendarDays size={18} />
                    </div>
                </div>

                <p className="text-2xl font-bold text-slate-800">
                    {solde}
                </p>

                <p className="text-xs text-slate-400 font-medium mt-1">
                    jour{solde > 1 ? "s" : ""}
                </p>
            </div>

            {/* En attente */}
            <StatBox
                icon={Clock}
                tone="pending"
                label="En attente"
                value={counts.en_attente ?? 0}
            />

            {/* Acceptées */}
            <StatBox
                icon={CheckCircle2}
                tone="approved"
                label="Acceptées"
                value={counts.acceptee ?? 0}
            />

            {/* Refusées */}
            <StatBox
                icon={XCircle}
                tone="rejected"
                label="Refusées"
                value={counts.refusee ?? 0}
            />

        </div>
    );
}

function StatBox({ icon: Icon, tone, label, value }) {
    const toneStyles = {
        pending: "bg-amber-50 text-amber-500",
        approved: "bg-emerald-50 text-emerald-600",
        rejected: "bg-rose-50 text-rose-500",
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">

                <p className="text-sm text-slate-500">
                    {label}
                </p>

                <div
                    className={`h-9 w-9 rounded-lg flex items-center justify-center ${toneStyles[tone]}`}
                >
                    <Icon size={18} />
                </div>

            </div>

            <p className="text-3xl font-bold text-slate-800">
                {value}
            </p>
        </div>
    );
}
