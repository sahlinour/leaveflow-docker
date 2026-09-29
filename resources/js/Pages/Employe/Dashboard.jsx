import EmployeeLayout from "@/Layouts/Employeelayout";
import DashboardHeader from "../../Components/Employee/Dashboard/DashboardHeader";
import StatsSummary from "../../Components/Employee/Dashboard/StatsSummary";
import RecentRequestsCard from "../../Components/Employee/Dashboard/RecentRequestsCard";
import BlockedPeriodsCard from "../../Components/Employee/Dashboard/BlockedPeriodsCard";
import MonthlyRequestsChart from "../../Components/Employee/Dashboard/MonthlyRequestsChart";

export default function Dashboard({auth,annee,solde = 0,counts,demandesRecentes = [],periodesBloquees = [],monthlyData = [],})
{
    return (
        <EmployeeLayout page="Tableau de bord">
            <DashboardHeader prenom={auth.user.prenom} nom={auth.user.nom} />

            <StatsSummary solde={solde} counts={counts} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <RecentRequestsCard demandes={demandesRecentes} />
                <BlockedPeriodsCard periodes={periodesBloquees} />
            </div>

            <MonthlyRequestsChart data={monthlyData} annee={annee} />
        </EmployeeLayout>
    );
}
