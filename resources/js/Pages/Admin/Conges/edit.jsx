import { useForm } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/LayoutAdmin";
import CongeForm from "../../../Components/Admin/Conges/CongeForm";

export default function Edit({ conge }) {
    const { data, setData, put, processing, errors } = useForm({
        user_id: conge.user.id,
        annee: conge.annee,
        solde_initial: conge.solde_initial,
        jours_utilise: conge.jours_utilise,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("conges.update", conge.id));
    };

    return (
        <AdminLayout page="Congés" notificationCount={7}>
            <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-slate-800">
                        Modifier un solde de congés
                    </h1>
                    <p className="text-[11px] sm:text-sm text-slate-400 mt-0.5">
                        Mettre à jour le solde d'un employé
                    </p>
                </div>

                <a
                    href={route("conges.index")}
                    className="text-[10px] sm:text-sm font-medium text-slate-500 hover:text-slate-700 whitespace-nowrap"
                >
                    ← Retour
                </a>
            </div>

            <CongeForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
                edit
                employeeName={`${conge.user.prenom} ${conge.user.nom}`}
            />
        </AdminLayout>
    );
}
