import { COLORS } from "../../../theme";

export default function EmployeeAvatar({ employee }) {
    const fullName = `${employee.prenom} ${employee.nom}`;

    return employee.photo ? (
        <img
            src={`/storage/${employee.photo}`}
            alt={fullName}
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover shrink-0"
        />
    ) : (
        <div
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-semibold shrink-0"
            style={{ backgroundColor: COLORS.mid }}
        >
            {getInitials(fullName)}
        </div>
    );
}

function getInitials(name) {
    return name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}