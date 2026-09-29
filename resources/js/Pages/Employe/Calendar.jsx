import { useState } from "react";
import { router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EmployeeLayout from "@/Layouts/Employeelayout";
import CalendarGrid from "../../../js/Components/Employee/Calander/CalendarGrid";
import CalendarLegend from "../../../js/Components/Employee/Calander/CalendarLegend";
import BlockedDatesAlert from "../../../js/Components/Employee/Calander/BlockedDatesAlert";

const MONTH_NAMES = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

export default function Calendar({ year, month, days = {}, blockedPeriods = [] }) {
    const [loading, setLoading] = useState(false);
    function goToMonth(newYear, newMonth) {
        setLoading(true);
        router.get(
            route("employe.calendar"),
            { year: newYear, month: newMonth },
            {
                preserveState: true,
                preserveScroll: true,
                only: ["year", "month", "days", "blockedPeriods"],
                onFinish: () => setLoading(false),
            }
        );
    }

    function previousMonth() {
        month === 1 ? goToMonth(year - 1, 12) : goToMonth(year, month - 1);
    }
    function nextMonth() {
        month === 12 ? goToMonth(year + 1, 1) : goToMonth(year, month + 1);
    }
    return (
        <EmployeeLayout page="Calendrier">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Calendrier des congés</h1>
                    <p className="text-sm text-slate-400">Votre planning personnel</p>
                </div>
                <CalendarLegend />
            </div>
            <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-700">
                    {MONTH_NAMES[month - 1]} {year}
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={previousMonth}
                        disabled={loading}
                        className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-60"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={nextMonth}
                        disabled={loading}
                        className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-60"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className={`transition-opacity ${loading ? "opacity-50" : "opacity-100"}`}>
                <CalendarGrid year={year} month={month} days={days} />
            </div>

            <BlockedDatesAlert periods={blockedPeriods} />
        </EmployeeLayout>
    );
}
