import { useForm, Link } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/LayoutAdmin";
import { COLORS } from "../../../theme";
import EmployeeForm from "../../../Components/Admin/Employees/EmployeeForm";

export default function Create({ companies = [], role }) {
    const { data, setData, post, processing, errors } = useForm({
        prenom: "",
        nom: "",
        cin: "",
        email: "",
        password: "",
        password_confirmation: "",
        telephone: "",
        adresse: "",
        photo: null,
        date_naissance: "",
        sexe: "",
        poste: "",
        date_embauche: "",
        statut: "actif",
        company_id: "",
        role_id: role?.id || "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("employees.store"), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout page="Employés" notificationCount={7}>
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">
                        Ajouter un employé
                    </h1>
                    <p className="text-sm text-slate-400">
                        Créer un nouveau compte employé
                    </p>
                </div>

                <Link
                    href={route("employees.index")}
                    className="text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                    ← Retour
                </Link>
            </div>

            <form
                onSubmit={submit}
                className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 space-y-6"
            >
                <EmployeeForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    companies={companies}
                />

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={processing}
                        className="text-sm font-medium text-white rounded-lg px-4 py-2.5 disabled:opacity-60"
                        style={{ backgroundColor: COLORS.dark }}
                    >
                        {processing
                            ? "Enregistrement..."
                            : "Enregistrer l'employé"}
                    </button>

                    <Link
                        href={route("employees.index")}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg border border-slate-300 text-[11px] sm:text-sm font-medium text-slate-700 hover:bg-slate-50 text-center"
                    >
                        Annuler
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}