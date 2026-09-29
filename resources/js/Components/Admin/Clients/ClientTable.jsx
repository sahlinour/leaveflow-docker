import { Link } from "@inertiajs/react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { COLORS } from "../../../theme";

export default function ClientTable({ clients, onDelete }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                                Nom complet
                            </th>

                            <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                                Société
                            </th>

                            <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                                Téléphone
                            </th>

                            <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                                Adresse
                            </th>

                            <th className="px-6 py-4 text-right font-semibold text-gray-700 dark:text-gray-200">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {clients.map((client) => (
                            <tr
                                key={client.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {client.prenom} {client.nom}
                                </td>

                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                    {client.company?.nom ?? "-"}
                                </td>

                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                    {client.telephone ?? "-"}
                                </td>

                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                    {client.email ?? "-"}
                                </td>

                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                    {client.adresse ?? "-"}
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={route(
                                                "clients.edit",
                                                client.id
                                            )}
                                            className="p-2 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-700"
                                            title="Modifier"
                                        >
                                            <Pencil
                                                size={17}
                                                style={{
                                                    color: COLORS.warning,
                                                }}
                                            />
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => onDelete(client)}
                                            className="p-2 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-700"
                                            title="Supprimer"
                                        >
                                            <Trash2
                                                size={17}
                                                style={{
                                                    color: COLORS.rejected,
                                                }}
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
