import { COLORS } from "../../../theme";

export default function CongeEmployee({ user }) {
    const initials = `${user.prenom?.[0] ?? ""}${user.nom?.[0] ?? ""}`.toUpperCase();

    return (
        <div className="flex items-center gap-2 sm:gap-3">
            {user.photo ? (
                <img
                    src={`/storage/${user.photo}`}
                    alt={user.prenom}
                    className="h-8 w-8 sm:h-11 sm:w-11 rounded-full object-cover"
                />
            ) : (
                <div
                    className="h-8 w-8 sm:h-11 sm:w-11 rounded-full flex items-center justify-center text-white text-[10px] sm:text-sm font-semibold"
                    style={{ backgroundColor: COLORS.mid }}
                >
                    {initials}
                </div>
            )}

            <div>
                <p className="font-semibold text-[11px] sm:text-sm text-slate-800">
                    {user.prenom} {user.nom}
                </p>
                <p className="text-[9px] sm:text-xs text-slate-500">
                    {user.email}
                </p>
            </div>
        </div>
    );
}