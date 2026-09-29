import { Link, useForm } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/LayoutAdmin";
import CompanyForm from "../../../Components/Admin/Companies/CompanyForm";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nom: "",
        adresse: "",
        logo: null,
        type: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("companies.store"), { forceFormData: true });
    };

    return (
        <AdminLayout page="Entreprises" notificationCount={7}>
            <div className="flex flex-col min-h-[calc(100vh-150px)]">
                <Header
                    title="Ajouter une entreprise"
                    description="Créez une nouvelle entreprise."
                />

                <CompanyForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    handleSubmit={handleSubmit}
                />
            </div>
        </AdminLayout>
    );
}

function Header({ title, description }) {
    return (
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
            <div>
                <h1 className="text-lg sm:text-2xl font-bold text-slate-800">
                    {title}
                </h1>
                <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5">
                    {description}
                </p>
            </div>

            <Link
                href={route("companies.index")}
                className="text-[10px] sm:text-sm text-slate-600 hover:text-slate-900 whitespace-nowrap"
            >
                ← Retour aux entreprises
            </Link>
        </div>
    );
}
