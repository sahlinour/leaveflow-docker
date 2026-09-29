import { useForm } from "@inertiajs/react";

import AdminLayout from "../../../Layouts/LayoutAdmin";
import ClientEditHeader from "../../../Components/Admin/Clients/ClientEditHeader";
import ClientForm from "../../../Components/Admin/Clients/ClientForm";
import ClientFormActions from "../../../Components/Admin/Clients/ClientFormActions";

export default function Edit({ client, companies = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        company_id: client?.company_id ?? "",
        nom: client?.nom ?? "",
        prenom: client?.prenom ?? "",
        telephone: client?.telephone ?? "",
        email: client?.email ?? "",
        adresse: client?.adresse ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("clients.update", client.id));
    };

    return (
        <AdminLayout page="Modifier le client">
            <div className="max-w-4xl mx-auto">
                <ClientEditHeader />

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
                            client={client}
                            edit
                        />
                    </div>

                    <ClientFormActions
                        processing={processing}
                        isEdit
                    />
                </form>
            </div>
        </AdminLayout>
    );
}