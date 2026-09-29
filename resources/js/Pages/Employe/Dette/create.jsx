import React, { useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";

import EmployeeLayout from "@/Layouts/Employeelayout";
import DetteFormHeader from "@/Components/Employee/Dettes/Detteformheader";
import DetteRow from "@/Components/Employee/Dettes/Detterow";
import AjouterDetteButton from "@/Components/Employee/Dettes/Ajouterdettebutton";
import DetteTotal from "@/Components/Employee/Dettes/Dettetotal";
import DetteFormActions from "@/Components/Employee/Dettes/Detteformactions";

export default function Create({ clients = [] }) {
    const [dettes, setDettes] = useState([
        {
            id: Date.now(),
            client_id: "",
            montant: "",
        },
    ]);

    const [processing, setProcessing] = useState(false);

    const totalDettes = useMemo(() => {
        return dettes.reduce((total, dette) => {
            return total + (Number(dette.montant) || 0);
        }, 0);
    }, [dettes]);

    const ajouterDette = () => {
        setDettes((previous) => [
            ...previous,
            {
                id: Date.now() + Math.random(),
                client_id: "",
                montant: "",
            },
        ]);
    };

    const supprimerDette = (id) => {
        if (dettes.length === 1) {
            return;
        }

        setDettes((previous) =>
            previous.filter((dette) => dette.id !== id)
        );
    };

    const modifierDette = (id, field, value) => {
        setDettes((previous) =>
            previous.map((dette) =>
                dette.id === id
                    ? { ...dette, [field]: value }
                    : dette
            )
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setProcessing(true);

        router.post(
            route("employe.dettes.store"),
            {
                dettes: dettes.map(({ client_id, montant }) => ({
                    client_id,
                    montant,
                })),
            },
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    };

    return (
        <>
            <Head title="Ajouter des dettes" />
            <EmployeeLayout page="Gestion des Dettes">
                <div className="mx-auto space-y-6">
                    <DetteFormHeader />
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <form
                            onSubmit={handleSubmit}
                            className="p-5 sm:p-6"
                        >
                            <div className="space-y-4">
                                {dettes.map((dette, index) => (
                                    <DetteRow
                                        key={dette.id}
                                        dette={dette}
                                        index={index}
                                        clients={clients}
                                        canDelete={dettes.length > 1}
                                        onChange={modifierDette}
                                        onRemove={supprimerDette}
                                    />
                                ))}
                            </div>
                            <AjouterDetteButton
                                onClick={ajouterDette}
                            />
                            <DetteTotal total={totalDettes} />
                            <DetteFormActions
                                processing={processing}
                            />
                        </form>
                    </div>
                </div>
            </EmployeeLayout>
        </>
    );
}
