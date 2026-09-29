import { Head } from "@inertiajs/react";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import BankForm from "@/Components/Admin/BankDocuments/BankForm";
import BankFormHeader from "@/Components/Admin/BankDocuments/BankFormHeader";

export default function Edit({companyBank,companies = [],banks = [],}) 
{
    return (
        <LayoutAdmin page="Modifier une banque">
            <Head title="Modifier une banque" />
            <BankFormHeader isEditing={true} />
                <BankForm
                    companies={companies}
                    banks={banks}
                    editingBank={companyBank}
                />
        </LayoutAdmin>
    );
}