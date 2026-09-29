import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";

import RegistrationSteps from "@/Components/Auth/EmployeeRegistration/RegistrationSteps";
import PersonalStep from "@/Components/Auth/EmployeeRegistration/PersonalStep";
import ProfessionalStep from "@/Components/Auth/EmployeeRegistration/ProfessionalStep";

export default function EmployeeRegister({
    token,
    company,
    expires_at,
}) {
    const [step, setStep] = useState(1);

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
    });

    const updateField = (field, value) => {
        setData(field, value);
    };

    const nextStep = (e) => {
        e.preventDefault();

        if (step === 1) {
            setStep(2);
        }
    };

    const previousStep = () => {
        setStep(1);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("employee.registration.store", token), {
            forceFormData: true,
        });
    };

    return (
        <GuestLayout>
            <Head title="Inscription employé" />

            <div className="mb-5">
                <h1 className="text-2xl font-bold text-slate-800 mb-1">
                    Créer votre compte
                </h1>

                <p className="text-sm text-slate-400">
                    Rejoignez votre espace LeaveFlow
                </p>
            </div>

            {company && (
                <div className="mb-5 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                    <p className="text-xs text-slate-400 mb-0.5">
                        Entreprise
                    </p>

                    <p className="text-sm font-semibold text-slate-700">
                        {company.nom}
                    </p>
                </div>
            )}

            <RegistrationSteps step={step} />

            {step === 1 && (
                <form onSubmit={nextStep}>
                    <PersonalStep
                        data={data}
                        setData={updateField}
                        errors={errors}
                    />

                    <button
                        type="submit"
                        className="w-full mt-5 text-sm font-medium text-white rounded-lg px-4 py-3 transition hover:opacity-90"
                        style={{ backgroundColor: "#2F6690" }}
                    >
                        Suivant
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={submit}>
                    <ProfessionalStep
                        data={data}
                        setData={updateField}
                        errors={errors}
                    />

                    <div className="flex gap-3 mt-5">
                        <button
                            type="button"
                            onClick={previousStep}
                            className="w-1/3 border border-slate-200 text-slate-600 rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-50"
                        >
                            ← Retour
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 text-sm font-medium text-white rounded-lg px-4 py-3 disabled:opacity-60"
                            style={{ backgroundColor: "#2F6690" }}
                        >
                            {processing
                                ? "Création..."
                                : "Créer mon compte"}
                        </button>
                    </div>
                </form>
            )}
        </GuestLayout>
    );
}