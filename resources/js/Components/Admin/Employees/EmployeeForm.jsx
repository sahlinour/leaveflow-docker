import FormField from "./FormField";
import EmployeePhoto from "./EmployeePhoto";

const inputClass =
    "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 bg-white";

export default function EmployeeForm({data,setData,errors,companies = [],employee = null,edit = false,}) 
{
    const input = (name, type = "text", placeholder = "") => (
        <input
            type={type}
            value={data[name]}
            onChange={(e) => setData(name, e.target.value)}
            placeholder={placeholder}
            className={inputClass}
        />
    );

    return (
        <>
            <EmployeePhoto
                data={data}
                setData={setData}
                error={errors.photo}
                employee={employee}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Prénom" error={errors.prenom}>
                    {input("prenom", "text", "Prenom")}
                </FormField>

                <FormField label="Nom" error={errors.nom}>
                    {input("nom", "text", "Nom")}
                </FormField>

                <FormField label="CIN" error={errors.cin}>
                    {input("cin", "text", "AB123456")}
                </FormField>

                <FormField label="Email" error={errors.email}>
                    {input("email", "email", "nom@gmail.com")}
                </FormField>

                <FormField label="Téléphone" error={errors.telephone}>
                    {input("telephone", "text", "06 XX XX XX XX")}
                </FormField>

                <FormField label="Date de naissance" error={errors.date_naissance}>
                    {input("date_naissance", "date")}
                </FormField>

                <FormField label="Sexe" error={errors.sexe}>
                    <select
                        value={data.sexe}
                        onChange={(e) => setData("sexe", e.target.value)}
                        className={inputClass}
                    >
                        <option value="">Sélectionner</option>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                    </select>
                </FormField>

                <FormField label="Date d'embauche" error={errors.date_embauche}>
                    {input("date_embauche", "date")}
                </FormField>

                <FormField label="Poste" error={errors.poste}>
                    {input("poste", "text", "Développeur Full-Stack")}
                </FormField>

                <FormField label="Entreprise" error={errors.company_id}>
                    <select
                        value={data.company_id}
                        onChange={(e) => setData("company_id", e.target.value)}
                        className={inputClass}
                    >
                        <option value="">Sélectionner une entreprise</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.nom}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Rôle">
                    <input
                        value="Employé"
                        readOnly
                        className={`${inputClass} bg-slate-100 cursor-not-allowed`}
                    />
                </FormField>

                <FormField label="Statut" error={errors.statut}>
                    <select
                        value={data.statut}
                        onChange={(e) => setData("statut", e.target.value)}
                        className={inputClass}
                    >
                        <option value="actif">Actif</option>
                        <option value="inactif">Inactif</option>
                    </select>
                </FormField>

                <div className="sm:col-span-2">
                    <FormField label="Adresse" error={errors.adresse}>
                        <textarea
                            value={data.adresse}
                            onChange={(e) => setData("adresse", e.target.value)}
                            rows={2}
                            placeholder="Adresse complète"
                            className={inputClass}
                        />
                    </FormField>
                </div>

                <FormField
                    label={edit ? "Nouveau mot de passe" : "Mot de passe"}
                    error={errors.password}
                >
                    {input(
                        "password",
                        "password",
                        edit ? "Laisser vide pour garder l'ancien" : "8 caractères minimum"
                    )}
                </FormField>

                <FormField
                    label="Confirmer le mot de passe"
                    error={errors.password_confirmation}
                >
                    {input("password_confirmation", "password")}
                </FormField>
            </div>
        </>
    );
}