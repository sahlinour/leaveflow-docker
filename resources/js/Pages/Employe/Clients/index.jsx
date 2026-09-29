import EmployeeLayout from "@/Layouts/Employeelayout";
import ClientHeader from "@/Components/Employee/Clients/ClientHeader";
import ClientTable from "@/Components/Employee/Clients/ClientTable";
import Pagination from "@/Components/Common/Pagination";

export default function Index({ clients = {} }) {
    const clientData = clients.data ?? [];

    return (
        <EmployeeLayout page="Mes clients">
            <div className="w-full">
                <ClientHeader total={clients.total ?? 0} />

                {clientData.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                        <p className="text-sm font-medium text-slate-600">
                            Aucun client trouvé.
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Commencez par ajouter un nouveau client.
                        </p>
                    </div>
                ) : (
                    <>
                        <ClientTable clients={clientData} />

                        <Pagination links={clients.links ?? []} />
                    </>
                )}
            </div>
        </EmployeeLayout>
    );
}
