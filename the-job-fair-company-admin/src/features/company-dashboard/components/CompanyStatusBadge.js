import { getCurrentCompany } from "../actions/companyData";

const STATUS_CONFIG = {
  active: {
    label: "Active",
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  inactive: {
    label: "Inactive",
    dot: "bg-slate-400",
    badge: "bg-slate-50 text-slate-600 border-slate-200",
  },
};

export default async function CompanyStatusBadge() {
  const company = await getCurrentCompany();

  if (!company) return null;

  const status = company.status?.toLowerCase();
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.inactive;

  return (
    <div
      className={`hidden sm:flex items-center gap-2 border rounded-full px-3 py-1.5 text-xs font-bold ${config.badge}`}
      title={`Company status: ${config.label}`}
    >
      <span className={`h-2 w-2 rounded-full ${config.dot}`} />
      {config.label}
    </div>
  );
}
