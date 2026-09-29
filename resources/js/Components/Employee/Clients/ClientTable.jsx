import { Link } from "@inertiajs/react";
import { Edit, Mail, MapPin, Phone, User } from "lucide-react";
import { COLORS } from "../../../theme";

export default function ClientTable({ clients = [] }) {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[750px]">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Client
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Téléphone
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Email
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Adresse
                            </th>

                            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {clients.map((client) => (
                            <tr
                                key={client.id}
                                className="transition hover:bg-slate-50"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-800">
                                                {client.prenom} {client.nom}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <span>
                                            {client.telephone || "—"}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <span>
                                            {client.email || "—"}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex max-w-[220px] items-center gap-2 text-sm text-slate-600">
                                        <span className="truncate">
                                            {client.adresse || "—"}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-5 py-4 text-right">
                                    <Link
                                        href={route(
                                            "employe.clients.edit",
                                            client.id
                                        )}
                                        className="
                                            inline-flex items-center gap-1.5
                                            rounded-lg border border-slate-200
                                            px-3 py-2
                                            text-xs font-semibold text-slate-600
                                            transition hover:bg-slate-100
                                        "
                                    >
                                        <Edit size={15} />

                                        Modifier
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}