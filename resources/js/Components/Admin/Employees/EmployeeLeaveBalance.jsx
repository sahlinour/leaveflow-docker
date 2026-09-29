export default function EmployeeLeaveBalance({ employee }) {
    const total = Number(employee.solde_initial) || 0;
    const used = Number(employee.jours_utilise) || 0;

    const percentage =
        total > 0 ? Math.min((used / total) * 100, 100) : 0;

    return (
        <div className="w-28 sm:w-32">
            <div className="flex justify-between text-[10px] sm:text-sm mb-1">
                <span className="text-slate-500">Utilisé</span>

                <span className="font-semibold">
                    {used}/{total}j
                </span>
            </div>

            <div className="w-full h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}