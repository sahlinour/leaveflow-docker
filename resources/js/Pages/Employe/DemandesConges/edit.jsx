import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import LayoutEmploye from "../../../Layouts/Employeelayout";
import { COLORS } from "../../../theme";
import CongeForm from "../../../Components/Employee/DemandeCreate/CongeForm";

export default function Edit({demande,soldeRestant = 0,periodesBloquees = [],annee,})
 {
    const {data,setData,put,processing,errors,} = useForm({
        date_debut: demande.date_debut || "",
        date_fin: demande.date_fin || "",
        nombre_jours: demande.nombre_jours || 0,
        type_conge: demande.type_conge || "",
        motif: demande.motif || "",
        justificatif: null,
    });

    const [fileName, setFileName] = useState(
        demande.justificatif
            ? demande.justificatif.split("/").pop()
            : ""
    );

    function trouverPeriodeBloquee(date) {
        if (!date) return null;
        return periodesBloquees.find((periode) => {
            return (
                date >= periode.date_debut &&
                date <= periode.date_fin
            );
        });
    }

    function verifierPeriodeBloquee(dateDebut, dateFin) {
        if (!dateDebut || !dateFin) return null;
        return periodesBloquees.find((periode) => {
            return (
                periode.date_debut <= dateFin &&
                periode.date_fin >= dateDebut
            );
        });
    }

    function calculateDays(start, end) {
        if (!start || !end) {
            setData("nombre_jours", 0);
            return;
        }

        const debut = new Date(start);
        const fin = new Date(end);
        const diff =
            Math.ceil(
                (fin - debut) /
                    (1000 * 60 * 60 * 24)
            ) + 1;

        setData(
            "nombre_jours",
            diff > 0 ? diff : 0
        );
    }

    function handleSubmit(e) {
        e.preventDefault();

        const periode = verifierPeriodeBloquee(
            data.date_debut,
            data.date_fin
        );

        if (periode) {
            alert(
                `Cette période est bloquée par l'entreprise${
                    periode.motif
                        ? ` : ${periode.motif}`
                        : "."
                }`
            );

            return;
        }

        put(
            route(
                "demandes-conges.update",
                demande.id
            ),
            {
                forceFormData: true,
            }
        );
    }

    const today = new Date()
        .toISOString()
        .split("T")[0];

    return (
        <LayoutEmploye page="Demandes de congés">

            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">

                <div>
                    <h1 className="text-xl font-bold text-slate-800">
                        Modifier la demande de congé
                    </h1>

                    <p className="text-sm text-slate-400">
                        Modifier votre demande avant son traitement
                    </p>
                </div>

                <Link
                    href={route(
                        "demandes-conges.index"
                    )}
                    className="text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                    Annuler
                </Link>

            </div>

            {/* Formulaire */}
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 space-y-6 mt-5"
            >

                {/* Référence */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-700">
                                Référence de la demande
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                                Cette référence ne peut pas être modifiée
                            </p>
                        </div>

                        <p className="text-sm font-semibold text-slate-700">
                            {demande.reference_demande}
                        </p>

                    </div>

                </div>

                {/* Solde */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-700">
                                Solde de congés disponible
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                                Année {annee}
                            </p>
                        </div>

                        <div className="text-right">

                            <p className="text-2xl font-bold text-slate-800">
                                {soldeRestant}
                            </p>

                            <p className="text-xs text-slate-400">
                                jour{soldeRestant > 1 ? "s" : ""}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Formulaire commun */}
                <CongeForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    today={today}
                    calculateDays={calculateDays}
                    trouverPeriodeBloquee={
                        trouverPeriodeBloquee
                    }
                    fileName={fileName}
                    setFileName={setFileName}
                />

                {/* Boutons */}
                <div
                    className="
                        flex flex-col sm:flex-row
                        items-stretch sm:items-center
                        gap-3 pt-4
                        border-t border-slate-100
                    "
                >

                    <button
                        type="submit"
                        disabled={processing}
                        className="
                            text-sm font-medium
                            text-white rounded-lg
                            px-4 py-2.5
                            disabled:opacity-60
                        "
                        style={{
                            backgroundColor: COLORS.dark,
                        }}
                    >
                        {processing
                            ? "Modification..."
                            : "Enregistrer les modifications"}
                    </button>

                    <Link
                        href={route(
                            "demandes-conges.index"
                        )}
                        className="
                            text-sm font-medium
                            text-slate-500
                            px-4 py-2.5
                            text-center
                        "
                    >
                        Annuler
                    </Link>
                </div>
            </form>
        </LayoutEmploye>
    );
}
