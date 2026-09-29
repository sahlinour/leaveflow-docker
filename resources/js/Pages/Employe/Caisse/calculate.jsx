import React, { useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";
import EmployeeLayout from "@/Layouts/Employeelayout";
import CalculateHeader from "@/Components/Employee/Caisse/calculate/CalculateHeader";
import CaisseForm from "@/Components/Employee/Caisse/calculate/CaisseForm";

const COUPURES = [1, 5, 10, 20, 50, 100, 200];

export default function Calculate({caisse = null,details = [],modeModification = false,}) 
{
    const initialMontants = useMemo(() => {
        const values = {
            1: "",
            5: "",
            10: "",
            20: "",
            50: "",
            100: "",
            200: "",
        };
        details.forEach((detail) => {
            const coupure = Number(detail.coupure);

            if (COUPURES.includes(coupure)) {
                values[coupure] = String(detail.montant);
            }
        });

        return values;
    }, [details]);

    const [montants, setMontants] = useState(
        initialMontants
    );
    const quantites = useMemo(() => {
        const result = {};
        COUPURES.forEach((coupure) => {
            const montant =
                Number(montants[coupure]) || 0;
            result[coupure] =
                montant > 0
                    ? montant / coupure
                    : 0;
        });

        return result;
    }, [montants]);

    const totalCaisse = useMemo(() => {
        return COUPURES.reduce(
            (total, coupure) => {
                return (
                    total +
                    (Number(montants[coupure]) || 0)
                );
            },
            0
        );
    }, [montants]);

    const handleChange = (coupure, value) => {
        if (
            value !== "" &&
            !/^\d*\.?\d*$/.test(value)
        ) {
            return;
        }

        setMontants((previous) => ({
            ...previous,
            [coupure]: value,
        }));
    };

    const handleSubmit = (event) => {
    event.preventDefault();

    if (!caisse) {
        return;
    }

    router.post(
        route("caisse.store", caisse.id),
        {
            montants,
        },
        {
            preserveScroll: true,
        }
    );
};

    const handleCloturer = () => {

        if (!caisse) {
            return;
        }

        const confirmed = window.confirm(
            "Êtes-vous sûr de vouloir clôturer cette caisse ?\n\n" +
            "Après clôture, la caisse ne pourra plus être modifiée."
        );

        if (!confirmed) {
            return;
        }

        router.post(
            route(
                "caisse.cloturer",
                caisse.id
            )
        );
    };

    return (
        <>
            <Head title="Calculer la caisse" />
            <EmployeeLayout page="Gestion Caisse">
                <div className="space-y-6">
                    <CalculateHeader
                        modeModification={
                            modeModification
                        }
                    />
                    <CaisseForm
                        montants={montants}
                        quantites={quantites}
                        totalCaisse={totalCaisse}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        onCloturer={handleCloturer}
                        modeModification={
                            modeModification
                        }
                    />
                </div>
            </EmployeeLayout>
        </>
    );
}