import { useForm } from "@inertiajs/react";

import EmployeeLayout from "@/Layouts/Employeelayout";
import ClientEditHeader from "@/Components/Employee/Clients/ClientEditHeader";
import ClientForm from "@/Components/Employee/Clients/ClientForm";
import ClientFormActions from "@/Components/Employee/Clients/ClientFormActions";

export default function Edit({ client }) {
    const { data, setData, put, processing, errors } = useForm({
        nom: client?.nom ?? "",
        prenom: client?.prenom ?? "",
        telephone: client?.telephone ?? "",
        email: client?.email ?? "",
        adresse: client?.adresse ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("employe.clients.update", client.id));
    };

    return (
        <EmployeeLayout page="Modifier le client">
            <div className="w-full max-w-4xl mx-auto">
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
                        />
                    </div>

                    <ClientFormActions
                        processing={processing}
                        isEdit={true}
                    />
                </form>
            </div>
        </EmployeeLayout>
    );
}
