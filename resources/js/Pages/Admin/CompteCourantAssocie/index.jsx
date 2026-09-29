import AdminLayout from "@/Layouts/LayoutAdmin";
import CompteCourantAssocieHeader from "@/Components/Admin/CompteCourantAssocie/CompteCourantAssocieHeader";
import CompteCourantAssocieTable from "@/Components/Admin/CompteCourantAssocie/CompteCourantAssocieTable";

export default function Index({ comptes = [] }) {
    return (
        <AdminLayout
            page="Compte courant associé"
            notificationCount={7}
        >
           <CompteCourantAssocieHeader comptes={comptes} />

            {/* Tableau */}
            <CompteCourantAssocieTable comptes={comptes} />
        </AdminLayout>
    );
}