import {
  getCurrentCompany,
  getCompanyEvents,
} from "@/features/company-dashboard/actions/companyData";
import CompanyEventsTable from "@/features/company-dashboard/components/CompanyEventsTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events | Company Portal",
};

export default async function CompanyEventsPage() {
  const company = await getCurrentCompany();

  if (!company) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Company profile not found. Please contact an administrator.
      </div>
    );
  }

  const events = await getCompanyEvents(company.id);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Your Events
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Events your company is participating in.
        </p>
      </div>
      <CompanyEventsTable events={events} />
    </div>
  );
}
