import { COLORS } from "../../../theme";

const WEEKDAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const STATUS_STYLES = {
    approved: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", label: "En congé" },
    pending: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", label: "En attente" },
    blocked: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", label: "Bloqué" },
};

export default function CalendarGrid({ year, month, days = {} }) {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const startWeekday = firstDayOfMonth.getDay(); // 0 = dimanche
    const todayKey = new Date().toISOString().slice(0, 10);
    const cells = [
        ...Array.from({ length: startWeekday }, () => null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);
    function dateKey(day) {
        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-7 border-b border-slate-100">
                {WEEKDAYS.map((d) => (
                    <div key={d} className="px-2 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {cells.map((day, i) => {
                    if (day === null) {
                        return <div key={i} className="min-h-[72px] sm:min-h-[92px] bg-slate-50/50 border-b border-r border-slate-100" />;
                    }
                    const key = dateKey(day);
                    const event = days[key];
                    const style = event ? STATUS_STYLES[event.type] : null;
                    const isToday = key === todayKey;
                    const isWeekend = i % 7 === 0 || i % 7 === 6;

                    return (
                        <div
                            key={i}
                            className={`min-h-[72px] sm:min-h-[92px] p-1.5 sm:p-2 border-b border-r border-slate-100 last:border-r-0 ${
                                style ? `${style.bg} border ${style.border}` : isWeekend ? "bg-slate-50/40" : "bg-white"
                            }`}
                        >
                            <span
                                className={`text-xs sm:text-sm font-medium ${
                                    style ? style.text : "text-slate-600"
                                } ${isToday ? "inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-white" : ""}`}
                                style={isToday ? { backgroundColor: COLORS.dark } : undefined}
                            >
                                {day}
                            </span>

                            {style && (
                                <p className={`hidden sm:block text-[11px] font-medium mt-1 ${style.text}`}>
                                    {style.label}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}