import DatePicker from "./Datepicker";
const inputClass =
    "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 bg-white";

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {label}
            </label>

            {children}

            {error && (
                <p className="mt-1.5 text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default function CongeForm({data,setData,errors,today,calculateDays,trouverPeriodeBloquee,fileName,setFileName,})
{
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Type de congé */}
            <Field
                label="Type de congé"
                error={errors.type_conge}
            >
                <select
                    value={data.type_conge}
                    onChange={(e) =>
                        setData("type_conge", e.target.value)
                    }
                    className={inputClass}
                >
                    <option value="">
                        Sélectionner un type
                    </option>

                    <option value="Annuel">
                        Congé annuel
                    </option>

                    <option value="Maladie">
                        Congé maladie
                    </option>

                    <option value="Exceptionnel">
                        Congé exceptionnel
                    </option>

                    <option value="Sans solde">
                        Congé sans solde
                    </option>
                </select>
            </Field>

            {/* Date début */}
            <Field
                label="Date début"
                error={errors.date_debut}
            >
                <DatePicker
                    value={data.date_debut}
                    /* minDate={today} */
                    trouverPeriodeBloquee={trouverPeriodeBloquee}
                    placeholder="Choisir la date de début"
                    onChange={(value) => {
                        setData("date_debut", value);
                        calculateDays(value, data.date_fin);
                    }}
                />
            </Field>

            {/* Date fin*/}
            <Field
                label="Date fin"
                error={errors.date_fin}
            >
                <DatePicker
                    value={data.date_fin}
                    minDate={data.date_debut || undefined}
                    /* minDate={data.date_debut || today} */
                    trouverPeriodeBloquee={trouverPeriodeBloquee}
                    placeholder="Choisir la date de fin"
                    onChange={(value) => {
                        setData("date_fin", value);
                        calculateDays(data.date_debut, value);
                    }}
                />
            </Field>

            {/* Nombre de jours */}
            <Field label="Nombre de jours">
                <input
                    type="number"
                    value={data.nombre_jours}
                    readOnly
                    className={`${inputClass} bg-slate-100 cursor-not-allowed`}
                />
            </Field>

            {/* Motif */}
            <div className="sm:col-span-2">
                <Field
                    label="Motif"
                    error={errors.motif}
                >
                    <textarea
                        rows={3}
                        value={data.motif}
                        onChange={(e) =>
                            setData(
                                "motif",
                                e.target.value
                            )
                        }
                        placeholder="Expliquez le motif de votre demande"
                        className={inputClass}
                    />
                </Field>
            </div>

            {/* Justificatif */}
            <div className="sm:col-span-2">
                <Field
                    label="Justificatif"
                    error={errors.justificatif}
                >
                    <label
                        className="
                            flex items-center gap-3
                            border border-slate-200
                            rounded-lg
                            px-3 py-2.5
                            cursor-pointer
                        "
                    >
                        <span className="text-sm text-slate-500">
                            {fileName || "Choisir un fichier"}
                        </span>

                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => {
                                const file =
                                    e.target.files[0];

                                setData(
                                    "justificatif",
                                    file
                                );

                                setFileName(
                                    file?.name || ""
                                );
                            }}
                        />
                    </label>
                </Field>
            </div>
        </div>
    );
}
