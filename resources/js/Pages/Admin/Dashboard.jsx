import { useState } from "react";
import { router } from "@inertiajs/react";
import LayoutAdmin from "../../Layouts/LayoutAdmin";
import DashboardHeader from "../../Components/Admin/Dashboard/DashboardHeader";
import StatsGrid from "../../Components/Admin/Dashboard/StatsGrid";
import MonthlyRequestsChart from "../../Components/Admin/Dashboard/MonthlyRequestsChart";
import CompanyRequestsChart from "../../Components/Admin/Dashboard/CompanyRequestsChart";

const currentYear = new Date().getFullYear();

export default function Dashboard({
    stats,
    monthlyData,
    companyData,
    filters = {},
}) {
    const [year, setYear] = useState(filters.year ?? currentYear);
    const [loading, setLoading] = useState(false);

    const handleYearChange = (newYear) => {
        setYear(newYear);
        setLoading(true);

        router.get(
            route("admin.dashboard"),
            { year: newYear },
            {
                preserveState: true,
                preserveScroll: true,
                only: ["stats", "monthlyData", "companyData", "filters"],
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <LayoutAdmin page="Dashboard" notificationCount={7}>
            <DashboardHeader
                year={year}
                loading={loading}
                onYearChange={handleYearChange}
            />

            <StatsGrid stats={stats} loading={loading} />

            <div
                className={`grid grid-cols-1 xl:grid-cols-3 gap-6 transition-opacity ${
                    loading ? "opacity-50" : "opacity-100"
                }`}
            >
                <MonthlyRequestsChart
                    data={monthlyData}
                    year={year}
                />

                <CompanyRequestsChart
                    data={companyData}
                    year={year}
                />
            </div>
        </LayoutAdmin>
    );
}
