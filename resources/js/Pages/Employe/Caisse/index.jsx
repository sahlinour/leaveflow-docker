import React from "react";
import { Head } from "@inertiajs/react";

import EmployeeLayout from "@/Layouts/Employeelayout";
import CaisseHeader from "@/Components/Employee/Caisse/index/CaisseHeader";
import CaisseStats from "@/Components/Employee/Caisse/index/CaisseStats";
import CaisseFilters from "@/Components/Employee/Caisse/index/CaisseFilters";
import CaisseTable from "@/Components/Employee/Caisse/index/CaisseTable";
import Pagination from "@/Components/Common/Pagination";

export default function Index({caisses = {},filters = {},compteCourantAssocie = 0,fondCaisse = 0,totalDisponible = 0,}) 
{
    const caissesData = caisses.data ?? [];

    return (
        <>
            <Head title="Gestion Caisse" />
            <EmployeeLayout page="Gestion Caisse">
                <div className="space-y-5">
                    <CaisseHeader compteCourantAssocie={compteCourantAssocie} />
                    <CaisseStats
                        fondCaisse={fondCaisse}
                        compteCourantAssocie={compteCourantAssocie}
                        totalCaisse={totalDisponible}
                    />
                    <CaisseFilters
                        filters={filters}
                    />
                    <CaisseTable
                        caisses={caissesData}
                    />
                    <Pagination
                        links={caisses.links ?? []}
                    />
                </div>
            </EmployeeLayout>
        </>
    );
}