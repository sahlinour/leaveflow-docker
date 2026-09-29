import React from "react";
import { Head, router, usePage } from "@inertiajs/react";

import EmployeeLayout from "@/Layouts/Employeelayout";
import DettesIndexHeader from "@/Components/Employee/Dettes/Dettesindexheader";
import DettesStats from "@/Components/Employee/Dettes/Dettesstats";
import DettesFilters from "@/Components/Employee/Dettes/Dettesfilters";
import DettesEmptyState from "@/Components/Employee/Dettes/Dettesemptystate";
import DetteJourGroup from "@/Components/Employee/Dettes/Dettejourgroup";

export default function Index({dettes = {},totalDettes = 0,nombreDettes = 0,filters = {},}) 
{
    const { errors, flash } = usePage().props;
    const [dateDebut, setDateDebut] = React.useState(
        filters.date_debut || ""
    );
    const [dateFin, setDateFin] = React.useState(
        filters.date_fin || ""
    );
    const [datesOuvertes, setDatesOuvertes] = React.useState({});
    const formatMoney = (value) => {
        return Number(value || 0).toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const formatDate = (date) => {
        if (!date) {
            return "—";
        }
        const [year, month, day] = String(date)
            .substring(0, 10)
            .split("-");

        if (!year || !month || !day) {
            return date;
        }
        return new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        ).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const groupes = Object.entries(dettes);
    const handleFilter = (event) => {
        event.preventDefault();
        router.get(
            route("employe.dettes.index"),
            {
                date_debut: dateDebut || undefined,
                date_fin: dateFin || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const resetFilters = () => {
        setDateDebut("");
        setDateFin("");
        router.get(
            route("employe.dettes.index"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const toggleDate = (date) => {
        setDatesOuvertes((previous) => ({
            ...previous,
            [date]: !previous[date],
        }));
    };

    const handleDelete = (id) => {
        const confirmation = window.confirm(
            "Êtes-vous sûr de vouloir supprimer cette dette ?"
        );
        if (!confirmation) {
            return;
        }
        router.delete(
            route("employe.dettes.destroy", {
                dette: id,
            }),
            {
                preserveScroll: true,
                preserveState: false,
            }
        );
    };

    return (
        <>
            <Head title="Gestion des Dettes" />
            <EmployeeLayout page="Gestion des Dettes">
                <div className="space-y-6">
                    <DettesIndexHeader />
                    <DettesStats
                        totalDettes={totalDettes}
                        nombreDettes={nombreDettes}
                        formatMoney={formatMoney}
                    />
                    <DettesFilters
                        dateDebut={dateDebut}
                        dateFin={dateFin}
                        onDateDebutChange={setDateDebut}
                        onDateFinChange={setDateFin}
                        onSubmit={handleFilter}
                        onReset={resetFilters}
                    />
                    {errors?.dette && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                            {errors.dette}
                        </div>
                    )}

                    {flash?.success && (
                        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                            {flash.success}
                        </div>
                    )}

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        {groupes.length === 0 ? (
                            <DettesEmptyState />
                        ) : (
                            <div className="divide-y divide-slate-200">
                                {groupes.map(([date, dettesDuJour]) => {
                                    const listeDettes = Array.isArray(
                                        dettesDuJour
                                    )
                                        ? dettesDuJour
                                        : [];

                                    const ouverte = datesOuvertes[date] !== false;
                                    return (
                                        <DetteJourGroup
                                            key={date}
                                            date={date}
                                            listeDettes={listeDettes}
                                            ouverte={ouverte}
                                            onToggle={toggleDate}
                                            formatDate={formatDate}
                                            formatMoney={formatMoney}
                                            onDelete={handleDelete}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </EmployeeLayout>
        </>
    );
}