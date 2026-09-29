import { Head } from "@inertiajs/react";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import BankFormHeader from "@/Components/Admin/BankDocuments/BankFormHeader";
import BankForm from "@/Components/Admin/BankDocuments/BankForm";

export default function Create({companies = [],banks = [],}) 
{
    return (
        <LayoutAdmin page="Ajouter une banque">
            <Head title="Ajouter une banque" />

            <div className="space-y-6">
                <BankFormHeader isEditing={false} />

                <BankForm
                    companies={companies}
                    banks={banks}
                />
            </div>
        </LayoutAdmin>
    );
}