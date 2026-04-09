import db from "@/lib/db";
import CompanyTable from "@/features/companies/components/CompanyTable";
import AddCompanyButton from "@/features/companies/components/AddCompanyButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Companies",
};

async function getCompanies() {
  const { rows } = await db.query(
    `
    SELECT
      c.*,
      COALESCE(COUNT(ec.event_id), 0) AS events_count,
      COALESCE(
        STRING_AGG(e.title, ', ' ORDER BY e.event_date DESC),
        ''
      ) AS event_titles
    FROM companies c
    LEFT JOIN event_companies ec ON ec.company_id = c.id
    LEFT JOIN events e ON e.id = ec.event_id
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `,
  );
  return rows;
}

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Companies</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Manage companies attending your job fair events.
          </p>
        </div>
        <AddCompanyButton />
      </div>
      <CompanyTable companies={companies} />
    </div>
  );
}

