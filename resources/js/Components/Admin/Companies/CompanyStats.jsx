export default function CompanyStats({
  employeesCount = 0,
  maxConcurrent = "—",
  activeRequests = 0,
}) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      <StatBox value={employeesCount} label="Employés" />
      <StatBox value={maxConcurrent} label="Congés max" />
      <StatBox value={activeRequests} label="Demandes actives" />
    </div>
  );
}

function StatBox({ value, label }) {
  return (
    <div className="bg-slate-50 rounded-lg py-3 text-center">
      <p className="text-lg font-bold text-slate-800">
        {value}
      </p>

      <p className="text-[11px] text-slate-400 leading-tight">
        {label}
      </p>
    </div>
  );
}