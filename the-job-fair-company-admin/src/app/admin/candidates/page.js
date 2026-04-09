import CandidateTable from "@/features/candidates/components/CandidateTable";
import AddCandidateButton from "@/features/candidates/components/AddCandidateButton";
import { getCandidates } from "@/features/candidates/actions/candidateData";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Candidates",
};



export default async function CandidatesPage() {
  const candidates = await getCandidates();

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Candidates</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Manage candidates for your job fair events.
          </p>
        </div>
        <AddCandidateButton />
      </div>
      <CandidateTable candidates={candidates} />
    </div>
  );
}
