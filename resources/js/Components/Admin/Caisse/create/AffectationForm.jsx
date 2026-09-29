import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

import AffectationEmployeeField from "./AffectationEmployeeField";
import AffectationLastFund from "./AffectationLastFund";
import AffectationFundField from "./AffectationFundField";
import AffectationDateField from "./AffectationDateField";
import AffectationFormActions from "./AffectationFormActions";

export default function AffectationForm({
    employes = [],
    caisse = null,
}) {
    const today = new Date()
        .toISOString()
        .split("T")[0];

    const isEdit = Boolean(caisse);

    const {data,setData,post,put,processing,errors,} = useForm({
        user_id: caisse?.user_id ?? "",
        fond_caisse: caisse?.fond_caisse ?? "",
        date_caisse: caisse?.date_caisse
            ? String(caisse.date_caisse).substring(0, 10)
            : today,
    });

    const [employeSelectionne, setEmployeSelectionne] =
        useState(null);

    useEffect(() => {
        const employe = employes.find(
            (item) => item.id === data.user_id
        );

        setEmployeSelectionne(employe ?? null);
    }, [data.user_id, employes]);

    useEffect(() => {
        if (isEdit || !data.user_id) {
            return;
        }
        const employe = employes.find(
            (item) => item.id === data.user_id
        );
        if (!employe) {
            return;
        }
        if (
            employe.dernier_fond !== null &&
            employe.dernier_fond !== undefined
        ) {
            setData(
                "fond_caisse",
                employe.dernier_fond
            );
        }
    }, [
        data.user_id,
        employes,
        isEdit,
    ]);

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(
                route("admin.caisse.update", {
                    caisse: caisse.id,
                }),
                {
                    preserveScroll: true,
                }
            );

            return;
        }
        post(
            route("admin.caisse.affecter"),
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <form
            onSubmit={submit}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl"
        >
            <div className="space-y-4 p-3 sm:space-y-5 sm:p-5 md:space-y-6 md:p-6">
                <AffectationEmployeeField
                    employes={employes}
                    value={data.user_id}
                    onChange={(value) =>
                        setData("user_id", value)
                    }
                    disabled={isEdit}
                    error={errors.user_id}
                />
                <AffectationLastFund
                    employe={employeSelectionne}
                />
                <AffectationFundField
                    value={data.fond_caisse}
                    onChange={(value) =>
                        setData("fond_caisse", value)
                    }
                    error={errors.fond_caisse}
                />
                <AffectationDateField
                    value={data.date_caisse}
                    onChange={(value) =>
                        setData("date_caisse", value)
                    }
                    error={errors.date_caisse}
                />
            </div>
            <AffectationFormActions
                processing={processing}
                isEdit={isEdit}
            />
        </form>
    );
}