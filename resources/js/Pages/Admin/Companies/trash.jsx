import { Link } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/LayoutAdmin";
import CompanyTrashHeader from "../../../Components/Admin/Companies/CompanyTrashHeader";
import CompanyTrashEmpty from "../../../Components/Admin/Companies/CompanyTrashEmpty";
import CompanyTrashTable from "../../../Components/Admin/Companies/CompanyTrashTable";
import Pagination from "@/Components/Common/Pagination";

export default function Trash({ companies = {} }) {
    const companyData = companies.data ?? [];

    return (
        <AdminLayout page="Corbeille">
            <CompanyTrashHeader
                count={companies.total ?? 0}
            />

            {companyData.length === 0 ? (
                <CompanyTrashEmpty />
            ) : (
                <>
                    <CompanyTrashTable
                        companies={companyData}
                    />

                    <Pagination
                        links={companies.links ?? []}
                    />
                </>
            )}
        </AdminLayout>
    );
}