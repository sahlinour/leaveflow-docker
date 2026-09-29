import { COLORS } from "../../../theme";

export default function PeriodeForm({
    typePeriode, setTypePeriode, mois, changerMois,
    dateDebut, setDateDebut, dateFin, setDateFin,
    motif, setMotif, ajouterPeriode, addingPeriode
}) {
    const type = (value) => {
        setTypePeriode(value);
        setMois("");
        setDateDebut("");
        setDateFin("");
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-4">
            <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Type de période
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                    {[
                        ["mois", "Mois complet", "Du premier au dernier jour du mois"],
                        ["personnalisee", "Période personnalisée", "Choisir librement les dates"]
                    ].map(([value, title, description]) => (
                        <label key={value}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition ${
                                typePeriode === value
                                    ? "border-[#3A7CA5] bg-[#3A7CA5]/5"
                                    : "border-slate-200 hover:bg-slate-50"
                            }`}>
                            <input type="radio" name="typePeriode" value={value}
                                checked={typePeriode === value}
                                onChange={() => type(value)}
                            />
                            <div>
                                <p className="text-sm font-medium text-slate-700">{title}</p>
                                <p className="text-xs text-slate-400">{description}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {typePeriode === "mois" && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Mois à bloquer
                    </label>
                    <input type="month" value={mois} onChange={e => changerMois(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20"
                    />
                </div>
            )}

            {typePeriode === "personnalisee" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {[
                        ["Date de début", dateDebut, setDateDebut],
                        ["Date de fin", dateFin, setDateFin]
                    ].map(([label, value, setter], i) => (
                        <div key={label}>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                {label}
                            </label>
                            <input type="date" min={i ? dateDebut || undefined : undefined}
                                value={value} onChange={e => setter(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20"
                            />
                        </div>
                    ))}
                </div>
            )}

            {dateDebut && dateFin && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-400 mb-1">Période qui sera bloquée</p>
                    <p className="text-sm font-semibold text-slate-700">
                        {new Date(dateDebut).toLocaleDateString("fr-FR")} →{" "}
                        {new Date(dateFin).toLocaleDateString("fr-FR")}
                    </p>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Motif</label>
                <input type="text" value={motif} onChange={e => setMotif(e.target.value)}
                    placeholder="Ex : Fermeture annuelle"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20"
                />
            </div>

            <div className="flex justify-end mt-5">
                <button type="button" onClick={ajouterPeriode} disabled={addingPeriode}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: COLORS.dark }}>
                    {addingPeriode ? "Ajout..." : "+ Ajouter la période"}
                </button>
            </div>
        </div>
    );
}