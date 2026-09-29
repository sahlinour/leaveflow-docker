export const COLORS = {
  dark: "#16425B",
  mid: "#2F6690",
  light: "#3A7CA5",
  pale: "#81C3D7",
  bg: "#F4F7F9",
  approved: "#2F6690",
  pending: "#E8A33D",
  rejected: "#D80536",
  muted: "#64748B",

    primaryDark: "#16425B",
    primary: "#2F6690",
    primaryLight: "#81C3D7",
    bgSoft: "#E8F3F7",
    bgSofter: "#F0F7FA",

    danger: "#D80536",
    dangerBg: "#FCE8ED",

    warning: "#E8A33D",
    warningBg: "#FDF3E3",

    success: "#0F9D58",
    successBg: "#E6F7EC",

};

export const navItems = [
  { label: "Tableau de bord", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "Entreprises", href: "/admin/companies", icon: "Building2" },
  { label: "Employés", href: "/admin/employees", icon: "Users" },
  { label: "Gestion Clients", href: "/admin/clients", icon: "Users" },
  { label: "Solde Congés", href: "/admin/conges", icon: "FileText" },
  { label: "Gestion Demandes", href: "/admin/demandes-conges", icon: "FileText"},
  { label: "Notifications", href: "/admin/notifications", icon: "Bell"},
  {label: "Gestion Caisse",href: "/admin/caisse",icon: "Wallet",},
  { label: "Compte courant associé", href: "/admin/compte-courant-associe", icon: "WalletCards" },
  { label: "Documents bancaires", href: "/admin/bank-documents", icon: "Landmark" },
  { label: "Historique", href: "/admin/historique-conges", icon: "TrendingUp" },
  { label: "Mon profil", href: "/profile", icon: "UserRound" },

];

export const employeeNavItems = [
  { label: "Tableau de bord", href: "/employe/dashboard", icon: "LayoutDashboard" },
  { label: "Mes demandes", href: "/employe/demandes-conges", icon: "FileText" },
  { label: "Calendrier", href: "/employe/calendar", icon: "Calendar" },
  { label: "Notifications", href: "/employe/notifications", icon: "Bell"},
  { label: "Gestion Clients", href: "/employe/clients", icon: "Users" },
  { label: "Gestion des Dettes",href: "/employe/dettes",icon: "ReceiptText"},
  { label: "Compte courant associé", href: "/employe/compte-courant-associe", icon: "WalletCards",},
  { label: "Gestion Caisse", href: "/employe/caisse", icon: "Wallet" },
  { label: "Documents bancaires", href: "/employe/bank-docs", icon: "Landmark" },
  { label: "Historique bancaire",href: "/employe/bank-docs/history",icon: "FileText"},
  { label: "Mon profil", href: "/profile", icon: "UserRound" },
];