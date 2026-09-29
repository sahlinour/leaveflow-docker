import React from "react";
import AdminLayout from "@/Layouts/LayoutAdmin";

import CompteCourantAssocieFormHeader from "@/Components/Admin/CompteCourantAssocie/CompteCourantAssocieFormHeader";
import CompteCourantAssocieForm from "@/Components/Admin/CompteCourantAssocie/CompteCourantAssocieForm";

export default function Create({ employees = [] }) {
    return (
        <AdminLayout
            page="Compte courant associé"
            notificationCount={7}
        >
            <CompteCourantAssocieFormHeader />

            <CompteCourantAssocieForm
                employees={employees}
            />
        </AdminLayout>
    );
}