import React from "react";
import { Head } from "@inertiajs/react";

import AdminLayout from "@/Layouts/LayoutAdmin";

import CaissePageHeader from "@/Components/Admin/Caisse/index/CaisseHeader";
import CaisseTable from "@/Components/Admin/Caisse/index/CaisseTable";
import CaisseFilters from "@/Components/Admin/Caisse/index/CaisseFiltres";

export default function Index({
    caisses = [],
    filters = {},
}) {
    return (
        <>
            <Head title="Gestion Caisse" />

            <AdminLayout page="Gestion Caisse">

                <div className="space-y-6">

                    <CaissePageHeader />

                    <CaisseFilters
                        filters={filters}
                    />

                    <CaisseTable
                        caisses={caisses}
                    />

                </div>

            </AdminLayout>
        </>
    );
}