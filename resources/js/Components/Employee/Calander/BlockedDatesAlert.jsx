import { AlertTriangle } from "lucide-react";

export default function BlockedDatesAlert({ periods = [] }) {
    if (periods.length === 0) return null;

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date + "T00:00:00").toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="flex gap-3 rounded-xl bg-rose-50 border border-rose-200 px-5 py-4">
            <AlertTriangle
                size={20}
                className="text-rose-500 shrink-0 mt-0.5"
            />

            <div>
                <p className="font-semibold text-rose-800">
                    Dates bloquées par l'administrateur
                </p>

                <div className="mt-2 space-y-1">
                    {periods.map((periode) => (
                        <div
                            key={periode.id}
                            className="text-sm text-rose-700"
                        >
                            <span className="font-medium">
                                {formatDate(periode.date_debut)}
                                {" → "}
                                {formatDate(periode.date_fin)}
                            </span>

                            {periode.motif && (
                                <span className="ml-2">
                                    ({periode.motif})
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <p className="text-sm text-rose-700 mt-2">
                    Ces dates ne peuvent pas être sélectionnées pour une
                    demande de congé.
                </p>
            </div>
        </div>
    );
}