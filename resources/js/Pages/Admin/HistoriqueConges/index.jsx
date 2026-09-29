import { useState } from "react";
import { router } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/LayoutAdmin";
import HistoriqueFilters from "../../../Components/Historique/HistoriqueFilters";
import HistoriqueTimeline from "../../../Components/Historique/HistoriqueTimeline";
import Pagination from "@/Components/Common/Pagination";

export default function Index({ historiques = {}, filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [action, setAction] = useState(filters.action ?? "");
    const [dateFrom, setDateFrom] = useState(filters.date_from ?? "");
    const [dateTo, setDateTo] = useState(filters.date_to ?? "");
    const historiqueData = historiques.data ?? [];

    function applyFilters(overrides = {}) {
        router.get(
            route("historique-conges.index"),
            { search, action, date_from: dateFrom, date_to: dateTo, ...overrides },
            { preserveState: true, preserveScroll: true }
        );
    }

    return (
        <AdminLayout page="Historique des congés" notificationCount={7}>
            <div className="mb-6">
                <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl md:text-2xl">
                    Historique des congés
                </h1>
                <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
                    {historiques.total} action(s) enregistrée(s) — toutes entreprises confondues
                </p>
            </div>

            <div className="mb-5">
                <HistoriqueFilters
                    search={search}
                    setSearch={setSearch}
                    action={action}
                    setAction={setAction}
                    dateFrom={dateFrom}
                    setDateFrom={setDateFrom}
                    dateTo={dateTo}
                    setDateTo={setDateTo}
                    onApply={applyFilters}
                />
            </div>

            <HistoriqueTimeline entries={historiqueData} />

            <Pagination links={historiques.links ?? []} />
        </AdminLayout>
    );
}