import PeriodeItem from "./PeriodeItem";

export default function PeriodeList({ periodesBloquees, onDelete }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {!periodesBloquees.length ? (
                <div className="px-6 py-8 text-center">
                    <p className="text-sm text-slate-500">
                        Aucune période bloquée pour cette entreprise.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {periodesBloquees.map(periode => (
                        <PeriodeItem key={periode.id} periode={periode} onDelete={onDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}