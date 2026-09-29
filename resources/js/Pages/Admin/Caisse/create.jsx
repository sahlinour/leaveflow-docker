import React from "react";
import { Head } from "@inertiajs/react";

import AdminLayout from "@/Layouts/LayoutAdmin";

import AffectationHeader from "@/Components/Admin/Caisse/create/AffectationHeader";
import AffectationForm from "@/Components/Admin/Caisse/create/AffectationForm";

export default function Create({ employes = [] }) {
    return (
        <>
            <Head title="Affecter un fond de caisse" />

            <AdminLayout page="Gestion Caisse">

                <div className="space-y-6">

                    <AffectationHeader />

                    <AffectationForm
                        employes={employes}
                    />

                </div>

            </AdminLayout>
        </>
    );
}