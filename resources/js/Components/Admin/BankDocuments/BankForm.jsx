import { useState } from "react";
import { router } from "@inertiajs/react";
import BankFormField from "./BankFormField";
import BankAccountField from "./BankAccountField";
import BankFormInfo from "./BankFormInfo";
import BankFormActions from "./BankFormActions";

const emptyForm = {
    company_id: "",
    bank_id: "",
    numero_compte: "",
    nom_beneficiaire: "",
    numero_compte_beneficiaire: "",
    ville: "",
    motif: "Virement ordinaire",
};

export default function BankForm({companies = [],banks = [],editingBank = null,}) 
{
    const isEditing = Boolean(editingBank);
    const [form, setForm] = useState(
        editingBank
            ? {
                  company_id:
                      editingBank.company_id || "",
                  bank_id:
                      editingBank.bank_id || "",
                  numero_compte:
                      editingBank.numero_compte || "",
                  nom_beneficiaire:
                      editingBank.nom_beneficiaire || "",
                  numero_compte_beneficiaire:
                      editingBank.numero_compte_beneficiaire ||
                      "",
                  ville: editingBank.ville || "",
                  motif:
                      editingBank.motif ||
                      "Virement ordinaire",
              }
            : emptyForm
    );

    const [processing, setProcessing] = useState(false);
    const change = ({ target }) => {
        setForm((previous) => ({
            ...previous,
            [target.name]: target.value,
        }));
    };
    const handleRibScan = (result) => {
        setForm((previous) => ({
            ...previous,
            numero_compte: result,
        }));
    };
    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        const options = {
            preserveScroll: true,

            onFinish: () => {
                setProcessing(false);
            },

            onSuccess: () => {
                if (!isEditing) {
                    router.visit(
                        route(
                            "admin.bank-documents.index"
                        )
                    );
                }
            },
        };

        if (isEditing) {
            router.put(
                route(
                    "admin.bank-documents.update",
                    editingBank.id
                ),
                form,
                options
            );
        } else {
            router.post(
                route("admin.bank-documents.store"),
                form,
                options
            );
        }
    };

    const fields = [
        {
            name: "nom_beneficiaire",
            label: "Nom du bénéficiaire",
            required: true,
        },
        {
            name: "numero_compte_beneficiaire",
            label: "Compte du bénéficiaire",
            required: true,
        },
        {
            name: "ville",
            label: "Ville",
            required: true,
        },
        {
            name: "motif",
            label: "Motif",
            required: false,
        },
    ];

    return (
        <form
            onSubmit={submit}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
            <div className="grid gap-5 p-6 md:grid-cols-2">
                <BankFormField
                    label="Entreprise"
                    name="company_id"
                    value={form.company_id}
                    onChange={change}
                    options={companies}
                    required
                />
                <BankFormField
                    label="Banque"
                    name="bank_id"
                    value={form.bank_id}
                    onChange={change}
                    options={banks}
                    required
                />
                <BankAccountField
                    value={form.numero_compte}
                    onChange={change}
                    onScan={handleRibScan}
                    isEditing={isEditing}
                />
                {fields.map((field) => (
                    <BankFormField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={form[field.name]}
                        onChange={change}
                        required={field.required}
                    />
                ))}
            </div>
            <BankFormInfo />
            <BankFormActions
                processing={processing}
                isEditing={isEditing}
            />
        </form>
    );
}