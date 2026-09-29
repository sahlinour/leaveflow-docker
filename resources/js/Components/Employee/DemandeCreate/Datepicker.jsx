import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS } from "../../../theme";

const WEEKDAYS = ["D", "L", "M", "M", "J", "V", "S"];
const MONTH_NAMES = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function toKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function parseKey(key) {
    if (!key) return null;
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d);
}
export default function DatePicker({
    value,
    onChange,
    minDate,
    trouverPeriodeBloquee = () => null,
    placeholder = "Sélectionner une date",
}) {
    const [open, setOpen] = useState(false);
    const selected = parseKey(value);
    const [viewDate, setViewDate] = useState(selected ?? parseKey(minDate) ?? new Date());
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth(); // 0-indexed ici (contrairement a CalendarGrid)
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const min = parseKey(minDate);
    min?.setHours(0, 0, 0, 0);

    const cells = [
        ...Array.from({ length: firstWeekday }, () => null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    function goToPreviousMonth() {
        setViewDate(new Date(year, month - 1, 1));
    }

    function goToNextMonth() {
        setViewDate(new Date(year, month + 1, 1));
    }

    function handleSelect(day) {
        const date = new Date(year, month, day);
        const key = toKey(date);

        if (min && date < min) return;

        const periode = trouverPeriodeBloquee(key);
        if (periode) return; 

        onChange(key);
        setOpen(false);
    }

    const displayLabel = selected
        ? selected.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })
        : placeholder;

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-2 border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none transition-all focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 bg-white"
            >
                <span className={selected ? "text-slate-700" : "text-slate-400"}>{displayLabel}</span>
                <CalendarIcon size={16} className="text-slate-400 shrink-0" />
            </button>

            {open && (
                <div className="absolute z-30 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-lg p-3">
                    <div className="flex items-center justify-between mb-2 px-1">
                        <button
                            type="button"
                            onClick={goToPreviousMonth}
                            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        <span className="text-sm font-semibold text-slate-700">
                            {MONTH_NAMES[month]} {year}
                        </span>
                        <button
                            type="button"
                            onClick={goToNextMonth}
                            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 mb-1">
                        {WEEKDAYS.map((d, i) => (
                            <div key={i} className="text-center text-[11px] font-medium text-slate-400 py-1">
                                {d}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-0.5">
                        {cells.map((day, i) => {
                            if (day === null) return <div key={i} />;

                            const date = new Date(year, month, day);
                            const key = toKey(date);
                            const periode = trouverPeriodeBloquee(key);
                            const isBlocked = Boolean(periode);
                            const isBeforeMin = min && date < min;
                            const isDisabled = isBlocked || isBeforeMin;
                            const isSelected = key === value;
                            const isToday = key === toKey(new Date());

                            return (
                                <button
                                    key={i}
                                    type="button"
                                    disabled={isDisabled}
                                    title={isBlocked ? (periode.motif || "Date bloquée") : undefined}
                                    onClick={() => handleSelect(day)}
                                    className={`
                                        h-9 rounded-lg text-sm flex items-center justify-center transition-colors
                                        ${isSelected ? "text-white font-semibold" : ""}
                                        ${isBlocked && !isSelected ? "bg-rose-50 text-rose-400 line-through cursor-not-allowed" : ""}
                                        ${isBeforeMin && !isBlocked ? "text-slate-300 cursor-not-allowed" : ""}
                                        ${!isDisabled && !isSelected ? "text-slate-700 hover:bg-slate-100" : ""}
                                        ${isToday && !isSelected ? "border border-slate-300" : ""}
                                    `}
                                    style={isSelected ? { backgroundColor: COLORS.dark } : undefined}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-rose-200" />
                            Bloqué
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.dark }} />
                            Sélectionné
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}