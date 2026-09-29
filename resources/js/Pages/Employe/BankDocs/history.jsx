import React from "react";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

import LayoutEmploye from "../../../Layouts/Employeelayout";
import BankHistoryHeader from "@/Components/Employee/BankDocs/BankHistoryHeader";
import BankHistoryEmpty from "@/Components/Employee/BankDocs/BankHistoryEmpty";
import BankHistoryTable from "@/Components/Employee/BankDocs/BankHistoryTable";
import Pagination from "@/Components/Common/Pagination";

export default function History({ documents = [] }) {
    return (
        <LayoutEmploye page="Historique bancaire">
            <Head title="Historique des documents bancaires" />

            <div className="space-y-5 sm:space-y-6">

                <BankHistoryHeader />

                {documents.length === 0 ? (
                    <BankHistoryEmpty />
                ) : (
                    <BankHistoryTable documents={documents} />
                )}

                <Pagination links={documents.links ?? []} />

            </div>
        </LayoutEmploye>
    );
}
