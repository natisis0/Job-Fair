import {
  getCurrentCompany,
  getCompanyCandidates,
} from "@/features/company-dashboard/actions/companyData";
import CompanyCandidatesTable from "@/features/company-dashboard/components/CompanyCandidatesTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Candidates | Company Portal",
};

export default async function CompanyCandidatesPage() {
  const company = await getCurrentCompany();

  if (!company) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Company profile not found. Please contact an administrator.
      </div>
    );
  }

  const candidates = await getCompanyCandidates(company.id);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Scanned Candidates
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          All candidates your company has scanned at events.
        </p>
      </div>
      <CompanyCandidatesTable candidates={candidates} />
    </div>
  );
}
