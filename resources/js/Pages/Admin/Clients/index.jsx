import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

import AdminLayout from "../../../Layouts/LayoutAdmin";
import { COLORS } from "../../../theme";

import ClientHeader from "@/Components/Admin/Clients/ClientHeader";
import ClientTable from "@/Components/Admin/Clients/ClientTable";

import Pagination from "@/Components/Common/Pagination";

export default function Index({ clients = {} }) {
    const clientData = clients.data ?? [];

    const handleDelete = (client) => {
        Swal.fire({
            title: "Supprimer le client ?",
            text: `Voulez-vous supprimer "${client.prenom} ${client.nom}" ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: COLORS.rejected,
            cancelButtonColor: COLORS.muted,
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler",
        }).then(({ isConfirmed }) => {
            if (!isConfirmed) return;

            router.delete(route("clients.destroy", client.id), {
                preserveScroll: true,

                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Supprimé !",
                        text: "Client supprimé avec succès.",
                        timer: 1800,
                        showConfirmButton: false,
                    });
                },
            });
        });
    };

    return (
        <AdminLayout page="Clients" notificationCount={7}>
            <ClientHeader total={clients.total ?? 0} />

            {clientData.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        Aucun client enregistré.
                    </p>
                </div>
            ) : (
                <>
                    <ClientTable
                        clients={clientData}
                        onDelete={handleDelete}
                    />

                    <Pagination links={clients.links ?? []} />
                </>
            )}
        </AdminLayout>
    );
}
