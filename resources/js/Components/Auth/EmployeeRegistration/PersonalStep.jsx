import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Camera } from "lucide-react";
import { useState } from "react";

const inputClass =
    "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 bg-white";

export default function PersonalStep({ data, setData, errors }) {
    const [photoPreview, setPhotoPreview] = useState(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0] ?? null;
        setData("photo", file);
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
        } else {
            setPhotoPreview(null);
        }
    };

    return (
        <div className="space-y-4">
            {/* Photo */}
            <div className="flex items-center gap-4">
                <label className="relative h-16 w-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer shrink-0">
                    {photoPreview ? (
                        <img
                            src={photoPreview}
                            alt="Aperçu de la photo"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <Camera
                            size={20}
                            className="text-slate-400"
                        />
                    )}

                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handlePhotoChange}
                        className="hidden"
                    />
                </label>

                <div>
                    <p className="text-sm font-medium text-slate-700">
                        Photo de profil
                    </p>

                    <p className="text-xs text-slate-400">
                        JPG ou PNG, 2 Mo maximum
                    </p>

                    <InputError message={errors.photo} />
                </div>
            </div>

            {/* Informations personnelles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Prénom */}
                <Field
                    label="Prénom"
                    error={errors.prenom}
                >
                    <input
                        type="text"
                        value={data.prenom}
                        onChange={(e) =>
                            setData("prenom", e.target.value)
                        }
                        placeholder="Prénom"
                        className={inputClass}
                        required
                    />
                </Field>

                {/* Nom */}
                <Field
                    label="Nom"
                    error={errors.nom}
                >
                    <input
                        type="text"
                        value={data.nom}
                        onChange={(e) =>
                            setData("nom", e.target.value)
                        }
                        placeholder="Nom"
                        className={inputClass}
                        required
                    />
                </Field>

                {/* CIN */}
                <Field
                    label="CIN"
                    error={errors.cin}
                >
                    <input
                        type="text"
                        value={data.cin}
                        onChange={(e) =>
                            setData("cin", e.target.value)
                        }
                        placeholder="AB123456"
                        className={inputClass}
                        required
                    />
                </Field>

                {/* Téléphone */}
                <Field
                    label="Téléphone"
                    error={errors.telephone}
                >
                    <input
                        type="tel"
                        value={data.telephone}
                        onChange={(e) =>
                            setData("telephone", e.target.value)
                        }
                        placeholder="06 XX XX XX XX"
                        className={inputClass}
                    />
                </Field>

                {/* Email */}
                <Field
                    label="Email"
                    error={errors.email}
                >
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) =>
                            setData("email", e.target.value)
                        }
                        placeholder="nom@entreprise.com"
                        className={inputClass}
                        required
                    />
                </Field>

                {/* Date de naissance */}
                <Field
                    label="Date de naissance"
                    error={errors.date_naissance}
                >
                    <input
                        type="date"
                        value={data.date_naissance}
                        onChange={(e) =>
                            setData(
                                "date_naissance",
                                e.target.value
                            )
                        }
                        className={inputClass}
                    />
                </Field>

                {/* Sexe */}
                <Field
                    label="Sexe"
                    error={errors.sexe}
                >
                    <select
                        value={data.sexe}
                        onChange={(e) =>
                            setData("sexe", e.target.value)
                        }
                        className={inputClass}
                    >
                        <option value="">
                            Sélectionner
                        </option>

                        <option value="Homme">
                            Homme
                        </option>

                        <option value="Femme">
                            Femme
                        </option>
                    </select>
                </Field>

                {/* Adresse */}
                <Field
                    label="Adresse"
                    error={errors.adresse}
                >
                    <input
                        type="text"
                        value={data.adresse}
                        onChange={(e) =>
                            setData("adresse", e.target.value)
                        }
                        placeholder="Adresse"
                        className={inputClass}
                    />
                </Field>
            </div>
        </div>
    );
}

function Field({ label, error, children }) {
    return (
        <div>
            <InputLabel value={label} />

            {children}

            <InputError message={error} />
        </div>
    );
}
