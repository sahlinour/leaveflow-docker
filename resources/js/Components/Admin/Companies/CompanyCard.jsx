import {
  Pencil,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";

import { Link } from "@inertiajs/react";
import { COLORS } from "../../../theme";
import CompanyStats from "./CompanyStats";

const AVATAR_COLORS = [
  COLORS.dark,
  COLORS.mid,
  COLORS.light,
  "#81C3D7",
  "#5C8AA6",
  "#0F3049",
];

export default function CompanyCard({
  company,
  index,
  generatingCompanyId,
  onDelete,
  onGenerateLink,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">

      {/* Company header */}
      <div className="flex items-start justify-between mb-4">

        <div className="flex items-center gap-3 min-w-0">

          {company.logo ? (
            <img
              src={`/storage/${company.logo}`}
              alt={company.nom}
              className="h-11 w-11 rounded-lg object-cover shrink-0 border border-slate-200"
            />
          ) : (
            <div
              className="h-11 w-11 rounded-lg flex items-center justify-center text-white font-semibold text-sm shrink-0"
              style={{
                backgroundColor:
                  AVATAR_COLORS[index % AVATAR_COLORS.length],
              }}
            >
              {initials(company.nom)}
            </div>
          )}

          <div className="min-w-0">
            <p className="font-semibold text-slate-800 leading-tight truncate">
              {company.nom}
            </p>

            {company.adresse && (
              <p className="text-sm text-slate-400 truncate">
                {company.adresse}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">

          <Link
            href={route("companies.edit", company.id)}
            className="text-slate-300 hover:text-slate-600 transition-colors"
          >
            <Pencil size={16} />
          </Link>

          <button
            type="button"
            onClick={() => onDelete(company)}
            className="text-slate-300 hover:text-rose-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>

        </div>
      </div>

      {/* Stats */}
      <CompanyStats
        employeesCount={company.employeesCount ?? 0}
        maxConcurrent={company.maxConcurrent ?? "—"}
        activeRequests={company.activeRequests ?? 0}
      />

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2">

        <Link
          href={route(
            "companies.contraintes.index",
            company.id
          )}
          className="text-center text-sm font-medium text-slate-600 border border-slate-200 rounded-lg py-2 hover:bg-slate-50 transition"
        >
          Configurer
        </Link>

        <Link
          href={route("employees.index", {
            company: company.id,
          })}
          className="text-center text-sm font-medium text-slate-600 border border-slate-200 rounded-lg py-2 hover:bg-slate-50 transition"
        >
          Voir les employés
        </Link>

        {/* Generate registration link */}
        <button
          type="button"
          onClick={() => onGenerateLink(company)}
          disabled={generatingCompanyId === company.id}
          className="col-span-2 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[#3A7CA5] text-[#2F6690] text-sm font-medium hover:bg-blue-50 disabled:opacity-50 transition"
        >
          <LinkIcon size={15} />

          {generatingCompanyId === company.id
            ? "Génération..."
            : "Générer lien d'inscription"}
        </button>

      </div>
    </div>
  );
}

function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}