import { CalendarOff } from "lucide-react";
import { COLORS } from "../../../theme";

export default function BlockedPeriodsCard({ periodes = [] }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-1">Périodes indisponibles</h2>
            <p className="text-xs text-slate-400 mb-4">Dates bloquées par votre entreprise</p>

            {periodes.length === 0 ? (
                <div className="py-8 text-center">
                    <CalendarOff size={24} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-sm text-slate-400">Aucune période bloquée à venir.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {periodes.map((periode, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                            <span
                                className="h-2 w-2 rounded-full mt-1.5 shrink-0"
                                style={{ backgroundColor: COLORS.rejected }}
                            />
                            <div>
                                <p className="text-slate-700 font-medium">
                                    {periode.dateDebut} → {periode.dateFin}
                                </p>
                                {periode.description && (
                                    <p className="text-xs text-slate-400">{periode.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}