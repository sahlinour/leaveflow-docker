import { useState } from "react";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

import AdminLayout from "../../../Layouts/LayoutAdmin";
import { COLORS } from "../../../theme";
import CompanyHeader from "../../../Components/Admin/Companies/CompanyHeader";
import CompanyList from "../../../Components/Admin/Companies/CompanyList";
import CompanyEmpty from "../../../Components/Admin/Companies/CompanyEmpty";
import RegistrationLinkModal from "../../../Components/Admin/Companies/RegistrationLinkModal";
import Pagination from "@/Components/Common/Pagination";

export default function Index({ companies = {}, trashCount = 0 }) {
    const [generatingCompanyId, setGeneratingCompanyId] = useState(null);
    const [registrationLink, setRegistrationLink] = useState(null);
    const [registrationCompanyName, setRegistrationCompanyName] = useState("");
    const companyData = companies.data ?? [];

    const handleDelete = (company) => {
        Swal.fire({
            title: "Supprimer l'entreprise ?",
            text: `Voulez-vous supprimer "${company.nom}" ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: COLORS.rejected,
            cancelButtonColor: COLORS.muted,
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler",
        }).then(({ isConfirmed }) => {
            if (!isConfirmed) return;

            router.delete(route("companies.destroy", company.id), {
                preserveScroll: true,
                onSuccess: () =>
                    Swal.fire({
                        icon: "success",
                        title: "Supprimée !",
                        text: "Entreprise supprimée avec succès.",
                        timer: 1800,
                        showConfirmButton: false,
                    }),
            });
        });
    };

    const handleGenerateRegistrationLink = (company) => {
        setGeneratingCompanyId(company.id);

        router.post(
            route("admin.employees.registration.generate"),
            { company_id: company.id },
            {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    const link = props.flash?.registration_link;

                    if (link) {
                        setRegistrationLink(link);
                        setRegistrationCompanyName(company.nom);
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Lien non reçu",
                            text: "Le serveur a généré le token mais le lien n'a pas été retourné.",
                        });
                    }
                },
                onError: () =>
                    Swal.fire({
                        icon: "error",
                        title: "Erreur",
                        text: "Impossible de générer le lien d'inscription.",
                    }),
                onFinish: () => setGeneratingCompanyId(null),
            }
        );
    };

    const closeRegistrationModal = () => {
        setRegistrationLink(null);
        setRegistrationCompanyName("");
    };

    return (
        <AdminLayout page="Entreprises" notificationCount={7}>
            <CompanyHeader
                total={companies.total ?? 0}
                trashCount={trashCount}
            />

            {companyData.length === 0 ? (
                <CompanyEmpty />
            ) : (
                 <>
                <CompanyList
                    companies={companies}
                    generatingCompanyId={generatingCompanyId}
                    onDelete={handleDelete}
                    onGenerateLink={handleGenerateRegistrationLink}
                />
                <Pagination links={companies.links ?? []}/>
                </>
            )}

            <RegistrationLinkModal
                link={registrationLink}
                companyName={registrationCompanyName}
                onClose={closeRegistrationModal}
            />
        </AdminLayout>
    );
}
