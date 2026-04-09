import CandidateForm from "@/features/candidates/components/CandidateForm";
import { notFound } from "next/navigation";
import { getCandidate } from "@/features/candidates/actions/candidateData";

export const metadata = {
  title: "Edit Candidate",
};



export default async function EditCandidatePage({ params }) {
  const { id } = await params;
  const candidate = await getCandidate(id);

  if (!candidate) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 w-full">
      <div className="w-full max-w-2xl text-left mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Edit Candidate</h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Update an existing candidate profile.
        </p>
      </div>
      <CandidateForm candidate={candidate} />
    </div>
  );
}
