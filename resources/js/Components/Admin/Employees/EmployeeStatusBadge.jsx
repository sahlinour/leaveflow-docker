export default function EmployeeStatusBadge({ status }) {
    const isActive = status?.toLowerCase() === "actif";

    return (
        <span
            className={`text-[9px] sm:text-xs font-medium rounded-full px-2 sm:px-2.5 py-1 ${
                isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
            }`}
        >
            {isActive ? "Actif" : "Inactif"}
        </span>
    );
}