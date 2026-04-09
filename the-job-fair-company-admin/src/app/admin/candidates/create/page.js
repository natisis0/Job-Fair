import CandidateForm from "@/features/candidates/components/CandidateForm";

export const metadata = {
  title: "Add Candidate",
};

export default function CreateCandidatePage() {
  return (
    <div className="flex flex-col items-center justify-center py-10 w-full">
      <div className="w-full max-w-2xl text-left mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Add Candidate</h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Create a new candidate profile manually.
        </p>
      </div>
      <CandidateForm />
    </div>
  );
}
