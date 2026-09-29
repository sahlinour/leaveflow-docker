import React from "react";
import EmployeeLayout from "@/Layouts/Employeelayout";

import CompteCourantAssocieHeader from "@/Components/Employee/CompteCourantAssocie/CompteCourantAssocieHeader";
import CompteCourantAssocieSolde from "@/Components/Employee/CompteCourantAssocie/CompteCourantAssocieSolde";
import CompteCourantAssocieTable from "@/Components/Employee/CompteCourantAssocie/CompteCourantAssocieTable";
import Pagination from "@/Components/Common/Pagination";

export default function Index({
    comptes = [],
    solde = 0,
}) {
    return (
        <EmployeeLayout
            page="Compte courant associé"
            notificationCount={7}
        >
            <CompteCourantAssocieHeader />

            <CompteCourantAssocieSolde
                solde={solde}
            />

            <CompteCourantAssocieTable
                comptes={comptes}
            />
             <Pagination links={comptes.links ?? []}/>
        </EmployeeLayout>
        
    );
}