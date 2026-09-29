export default function CongeBalanceBadge({ value }) {
    if (value <= 0)
        return (
            <span className="px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-xs font-semibold bg-red-100 text-red-700 whitespace-nowrap">
                Épuisé
            </span>
        );

    if (value <= 5)
        return (
            <span className="px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-xs font-semibold bg-yellow-100 text-yellow-700 whitespace-nowrap">
                {value} jours
            </span>
        );

    return (
        <span className="px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-xs font-semibold bg-green-100 text-green-700 whitespace-nowrap">
            {value} jours
        </span>
    );
}