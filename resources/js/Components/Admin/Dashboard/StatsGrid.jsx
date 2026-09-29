import {Home,UserRound,ClipboardList,Clock,CheckCircle2,XCircle,} from "lucide-react";
import StatCard from "./StatCard";

export default function StatsGrid({ stats, loading }) {
    const cards = [
        ["Total Entreprises", stats?.companies, Home],
        ["Total Employés", stats?.employees, UserRound],
        ["Demandes de Congés", stats?.requests, ClipboardList],
        ["En Attente", stats?.pending, Clock, "pending"],
        ["Approuvées", stats?.approved, CheckCircle2, "approved"],
        ["Rejetées", stats?.rejected, XCircle, "rejected"],
    ];

    return (
        <div className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 transition-opacity ${loading ? "opacity-50" : "opacity-100"}`}>
            {cards.map(([label, value, icon, tone]) => (
                <StatCard
                    key={label}
                    label={label}
                    value={value ?? 0}
                    icon={icon}
                    tone={tone}
                />
            ))}
        </div>
    );
}
