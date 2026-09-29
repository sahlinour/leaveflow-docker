export default function DemandeStatusBadge({ statut }) {
    const styles = {
        "Approuvée": {
            backgroundColor: "#DCFCE7",
            color: "#166534",
        },
        "Refusée": {
            backgroundColor: "#FEE2E2",
            color: "#991B1B",
        },
        "En attente": {
            backgroundColor: "#FEF3C7",
            color: "#92400E",
        },
        "Annulée": {
            backgroundColor: "#F1F5F9",
            color: "#475569",
        },
    };

    const style = styles[statut] || styles["En attente"];

    return (
        <span
            className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap"
            style={style}
        >
            {statut}
        </span>
    );
}
