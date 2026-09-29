import { useForm } from "@inertiajs/react";

import EmployeeLayout from "@/Layouts/Employeelayout";
import ClientCreateHeader from "@/Components/Employee/Clients/ClientCreateHeader";
import ClientForm from "@/Components/Employee/Clients/ClientForm";
import ClientFormActions from "@/Components/Employee/Clients/ClientFormActions";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
        adresse: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("employe.clients.store"));
    };

    return (
        <EmployeeLayout page="Nouveau client">
            <div className="w-full mx-auto">
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
                        />
                    </div>

                    <ClientFormActions
                        processing={processing}
                        isEdit={false}
                    />
                </form>
            </div>
        </EmployeeLayout>
    );
}
