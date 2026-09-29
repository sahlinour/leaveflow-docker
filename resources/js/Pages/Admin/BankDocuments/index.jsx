import { useMemo, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";

import LayoutAdmin from "../../../Layouts/LayoutAdmin";
import BankHeader from "../../../Components/Admin/BankDocuments/BankHeader";
import BankFilters from "../../../Components/Admin/BankDocuments/BankFilters";
import CompanyBankList from "../../../Components/Admin/BankDocuments/CompanyBankList";
import BankDeleteDialog from "../../../Components/Admin/BankDocuments/BankDeleteDialog";

export default function Index({
    companies = [],
    banks = [],
}) {
    const { auth } = usePage().props;

    const isSupervisor =
        auth?.user?.role?.slug === "supervisor";

    const canManage = !isSupervisor;

    const [deletingBank, setDeletingBank] = useState(null);

    const [search, setSearch] = useState("");
    const [companyFilter, setCompanyFilter] = useState("");
    const [bankFilter, setBankFilter] = useState("");

    const companyBanks = useMemo(() => {
        return companies.flatMap((company) =>
            (company.company_banks || []).map((companyBank) => ({
                ...companyBank,
                company,
            }))
        );
    }, [companies]);

    const filteredCompanyBanks = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        return companyBanks.filter((companyBank) => {
            const matchesSearch =
                searchValue === "" ||
                companyBank.company?.nom
                    ?.toLowerCase()
                    .includes(searchValue) ||
                companyBank.bank?.nom
                    ?.toLowerCase()
                    .includes(searchValue) ||
                companyBank.numero_compte
                    ?.toLowerCase()
                    .includes(searchValue) ||
                companyBank.nom_beneficiaire
                    ?.toLowerCase()
                    .includes(searchValue) ||
                companyBank.numero_compte_beneficiaire
                    ?.toLowerCase()
                    .includes(searchValue) ||
                companyBank.ville
                    ?.toLowerCase()
                    .includes(searchValue);

            const matchesCompany =
                companyFilter === "" ||
                companyBank.company_id === companyFilter;

            const matchesBank =
                bankFilter === "" ||
                companyBank.bank_id === bankFilter;

            return (
                matchesSearch &&
                matchesCompany &&
                matchesBank
            );
        });
    }, [
        companyBanks,
        search,
        companyFilter,
        bankFilter,
    ]);

    const handleEdit = (companyBank) => {
        router.get(
            route(
                "admin.bank-documents.edit",
                companyBank.id
            )
        );
    };

    const handleDelete = (companyBank) => {
        setDeletingBank(companyBank);
    };

    const confirmDelete = () => {
        if (!deletingBank) return;

        router.delete(
            route(
                "admin.bank-documents.destroy",
                deletingBank.id
            ),
            {
                preserveScroll: true,
                onSuccess: () => setDeletingBank(null),
            }
        );
    };

    const handleCreate = () => {
        router.get(
            route("admin.bank-documents.create")
        );
    };

    return (
        <LayoutAdmin page="Documents bancaires">
            <Head title="Documents bancaires" />

            <div className="space-y-6">

                {/* Header */}
                <BankHeader
                    onCreate={
                        canManage
                            ? handleCreate
                            : undefined
                    }
                />

                {/* Filtres */}
                <BankFilters
                    search={search}
                    setSearch={setSearch}
                    companyFilter={companyFilter}
                    setCompanyFilter={setCompanyFilter}
                    bankFilter={bankFilter}
                    setBankFilter={setBankFilter}
                    companies={companies}
                    banks={banks}
                />

                {/* Liste */}
                <CompanyBankList
                    companyBanks={filteredCompanyBanks}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    canManage={canManage}
                />

                {/* Confirmation suppression */}
                {canManage && deletingBank && (
                    <BankDeleteDialog
                        companyBank={deletingBank}
                        onClose={() =>
                            setDeletingBank(null)
                        }
                        onConfirm={confirmDelete}
                    />
                )}
            </div>
        </LayoutAdmin>
    );
}