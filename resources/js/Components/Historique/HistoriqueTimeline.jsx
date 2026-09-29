import { History } from "lucide-react";
import HistoriqueItem from "./HistoriqueItem";

export default function HistoriqueTimeline({ entries = [] }) {
    if (entries.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
                <History size={28} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm text-slate-400">Aucune activité trouvée.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
            {entries.map((entry, i) => (
                <HistoriqueItem key={entry.id} entry={entry} avatarIndex={i} isLast={i === entries.length - 1} />
            ))}
        </div>
    );
}