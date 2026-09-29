import { useForm } from "@inertiajs/react";

import AdminLayout from "../../../Layouts/LayoutAdmin";
import ClientForm from "../../../Components/Admin/Clients/ClientForm";
import ClientFormActions from "../../../Components/Admin/Clients/ClientFormActions";
import ClientCreateHeader from "../../../Components/Admin/Clients/ClientCreateHeader";

export default function Create({ companies = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        company_id: "",
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
        adresse: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("clients.store"));
    };

    return (
        <AdminLayout page="Nouveau client">
            <div className="max-w-4xl mx-auto">
                <ClientCreateHeader />

                <form
                    onSubmit={submit}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm"
                >
                    <div className="p-6">
                        <ClientForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            companies={companies}
                        />
                    </div>

                    <ClientFormActions
                        processing={processing}
                        isEdit={false}
                    />
                </form>
            </div>
        </AdminLayout>
    );
}
