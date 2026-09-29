import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import AdminLayout from "../../../Layouts/LayoutAdmin";
import { COLORS } from "../../../theme";

import ContrainteHeader from "../../../Components/Admin/ContraintesConges/ContrainteHeader";
import ContrainteAlert from "../../../Components/Admin/ContraintesConges/ContrainteAlert";
import ContrainteSettings from "../../../Components/Admin/ContraintesConges/ContrainteSettings";
import PeriodeForm from "../../../Components/Admin/ContraintesConges/PeriodeForm";
import PeriodeList from "../../../Components/Admin/ContraintesConges/PeriodeList";

export default function Index({ contrainte, company, periodesBloquees = [] }) {
    const [maxEmployes, setMaxEmployes] = useState(contrainte?.max_employes_simultanes ?? 1);
    const [dureeMax, setDureeMax] = useState(contrainte?.duree_max_conge ?? 30);
    const [saving, setSaving] = useState(false);
    const [typePeriode, setTypePeriode] = useState("dates");
    const [mois, setMois] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [motif, setMotif] = useState("");
    const [addingPeriode, setAddingPeriode] = useState(false);

    const save = () => {
        setSaving(true);
        router.put(route("contraintes-conges.update", contrainte.id), {
            max_employes_simultanes: maxEmployes,
            duree_max_conge: dureeMax,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success", title: "Succès",
                    text: "Les paramètres ont été enregistrés avec succès.",
                    confirmButtonColor: COLORS.dark, timer: 1500, showConfirmButton: false,
                });
                setTimeout(() => router.visit(route("companies.index")), 1500);
            },
            onError: () => Swal.fire({
                icon: "error", title: "Erreur",
                text: "Impossible d'enregistrer les paramètres.",
                confirmButtonColor: "#dc2626",
            }),
            onFinish: () => setSaving(false),
        });
    };

    const changerMois = value => {
        setMois(value);
        if (!value) return setDates("", "");

        const [annee, mois] = value.split("-").map(Number);
        const dernierJour = new Date(annee, mois, 0).getDate();
        setDates(
            `${annee}-${String(mois).padStart(2, "0")}-01`,
            `${annee}-${String(mois).padStart(2, "0")}-${String(dernierJour).padStart(2, "0")}`
        );
    };

    const setDates = (debut, fin) => {
        setDateDebut(debut);
        setDateFin(fin);
    };

    const ajouterPeriode = e => {
        e.preventDefault();

        if (!dateDebut || !dateFin)
            return Swal.fire({
                icon: "warning", title: "Dates obligatoires",
                text: "Veuillez sélectionner une période.",
                confirmButtonColor: COLORS.dark,
            });

        if (dateFin < dateDebut)
            return Swal.fire({
                icon: "warning", title: "Dates invalides",
                text: "La date de fin doit être supérieure ou égale à la date de début.",
                confirmButtonColor: COLORS.dark,
            });

        setAddingPeriode(true);

        router.post(route("periodes-bloquees.store"), {
            company_id: company.id,
            date_debut: dateDebut,
            date_fin: dateFin,
            motif,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setMois("");
                setDates("", "");
                setMotif("");
                Swal.fire({
                    icon: "success", title: "Période ajoutée",
                    text: "La période bloquée a été ajoutée avec succès.",
                    confirmButtonColor: COLORS.dark, timer: 1500, showConfirmButton: false,
                });
            },
            onError: () => Swal.fire({
                icon: "error", title: "Erreur",
                text: "Impossible d'ajouter la période bloquée.",
                confirmButtonColor: "#dc2626",
            }),
            onFinish: () => setAddingPeriode(false),
        });
    };

    const supprimerPeriode = id => {
        Swal.fire({
            icon: "warning", title: "Supprimer la période ?",
            text: "Cette période ne sera plus bloquée pour les employés.",
            showCancelButton: true, confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler", confirmButtonColor: "#dc2626",
        }).then(({ isConfirmed }) => {
            if (!isConfirmed) return;

            router.delete(route("periodes-bloquees.destroy", id), {
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire({
                        icon: "success", title: "Supprimée",
                        text: "La période bloquée a été supprimée.",
                        confirmButtonColor: COLORS.dark, timer: 1500, showConfirmButton: false,
                    });
                    setTimeout(() => router.visit(route("companies.index")), 1500);
                },
            });
        });
    };

    const rows = [
        {
            title: "Employés simultanément en congé (max)",
            description: "Combien d'employés peuvent être en congé en même temps",
            value: maxEmployes, unit: "employés",
            onDecrement: () => setMaxEmployes(Math.max(1, maxEmployes - 1)),
            onIncrement: () => setMaxEmployes(maxEmployes + 1),
        },
        {
            title: "Durée maximale d'un congé",
            description: "Nombre maximum de jours consécutifs par demande",
            value: dureeMax, unit: "jours",
            onDecrement: () => setDureeMax(Math.max(1, dureeMax - 1)),
            onIncrement: () => setDureeMax(dureeMax + 1),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Contraintes de congés" />

            <div className="max-w-4xl mx-auto py-8 px-6">
                <ContrainteHeader company={company} />
                <ContrainteAlert conflit={contrainte?.conflit} />
                <ContrainteSettings rows={rows} />

                <div className="mt-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-800">Périodes bloquées</h3>
                        <p className="text-sm text-slate-400 mt-1">
                            Les employés de cette entreprise ne pourront pas sélectionner ces périodes lors d'une demande de congé.
                        </p>
                    </div>

                    <PeriodeForm
                        typePeriode={typePeriode}
                        setTypePeriode={setTypePeriode}
                        mois={mois}
                        changerMois={changerMois}
                        dateDebut={dateDebut}
                        setDateDebut={setDateDebut}
                        dateFin={dateFin}
                        setDateFin={setDateFin}
                        motif={motif}
                        setMotif={setMotif}
                        ajouterPeriode={ajouterPeriode}
                        addingPeriode={addingPeriode}
                    />

                    <PeriodeList
                        periodesBloquees={periodesBloquees}
                        onDelete={supprimerPeriode}
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Link href={route("companies.index")}
                        className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50">
                        Retour
                    </Link>

                    <button type="button" onClick={save} disabled={saving}
                        className="px-5 py-2.5 rounded-lg text-white hover:opacity-90 disabled:opacity-60"
                        style={{ backgroundColor: COLORS.dark }}>
                        {saving ? "Enregistrement..." : "Enregistrer"}
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}