export function getActiveHref(items, url) {
    const matches = items.filter(
        (item) =>
            url === item.href ||
            url.startsWith(item.href + "/")
    );

    if (matches.length === 0) {
        return null;
    }

    return matches.reduce((longest, current) =>
        current.href.length > longest.href.length
            ? current
            : longest
    ).href;
}

export function getBadge(
    item,
    pendingRequests,
    unreadNotificationsCount
) {
    if (
        item.label === "Gestion Demandes" &&
        pendingRequests > 0
    ) {
        return pendingRequests;
    }

    if (
        item.label === "Notifications" &&
        unreadNotificationsCount > 0
    ) {
        return unreadNotificationsCount;
    }

    return item.badge > 0 ? item.badge : null;
}

export const RESTRICTED_LABELS = [
    "Gestion Clients",
    "Documents bancaires",
    "Historique bancaire",
    "Compte courant associé",
    "Gestion des Dettes",
    "Gestion Caisse",
    
];

export function isAdmin(items, authUser) {
    const isEmployeeSidebar = items.some((item) =>
        item.href.startsWith("/employe/")
    );

    if (!isEmployeeSidebar) return true;
    return authUser?.company?.type === true;
}

export function getVisibleItems(items, authUser) {
    const admin = isAdmin(items, authUser);
    const role = authUser?.role?.slug;

    return items.filter((item) => {
        return RESTRICTED_LABELS.includes(item.label) ? admin : true;
    });
}