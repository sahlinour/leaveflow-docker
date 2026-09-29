import { COLORS } from "../../../theme";

export default function CalendarLegend() {
    const items = [
        { color: COLORS.approved, label: "Congé approuvé" },
        { color: COLORS.pending, label: "En attente" },
        { color: COLORS.rejected, label: "Bloqué par l'administrateur" },
    ];

    return (
        <div className="flex flex-wrap items-center gap-4">
            {items.map((item) => (
                <span key={item.label} className="flex items-center gap-1.5 text-sm text-slate-600">
                    <span
                        className="h-2.5 w-2.5 rounded-full border"
                        style={{ backgroundColor: `${item.color}33`, borderColor: item.color }}
                    />
                    {item.label}
                </span>
            ))}
        </div>
    );
}