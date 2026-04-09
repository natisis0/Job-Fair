import { getCurrentCompany } from "@/features/company-dashboard/actions/companyData";
import QrScanner from "@/features/company-dashboard/components/QrScanner";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Scan QR | Company Portal",
};

export default async function CompanyScanPage() {
  const company = await getCurrentCompany();

  if (!company) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Company profile not found. Please contact an administrator.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Scan Candidate QR Code
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Use your device camera to scan a candidate&apos;s QR code and register
          them.
        </p>
      </div>
      <QrScanner companyId={company.id} />
    </div>
  );
}
