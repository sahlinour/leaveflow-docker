import React from "react";
import { Head } from "@inertiajs/react";

import AdminLayout from "@/Layouts/LayoutAdmin";

import AffectationHeader from "@/Components/Admin/Caisse/create/AffectationHeader";
import AffectationForm from "@/Components/Admin/Caisse/create/AffectationForm";

export default function Edit({
    caisse,
}) {
    return (
        <>
            <Head title="Modifier le fond de caisse" />

            <AdminLayout page="Gestion Caisse">

                <div className="space-y-6">

                    <AffectationHeader />

                    <AffectationForm
                        mode="edit"
                        caisse={caisse}
                    />

                </div>

            </AdminLayout>
        </>
    );
}