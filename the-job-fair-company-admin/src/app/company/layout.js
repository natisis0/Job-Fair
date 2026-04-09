import { UserButton } from "@clerk/nextjs";
import CompanyLayoutClient from "@/features/company-dashboard/components/CompanyLayoutClient";
import CompanyStatusBadge from "@/features/company-dashboard/components/CompanyStatusBadge";

export default function CompanyLayout({ children }) {
  const statusBadge = (
    <>
      <CompanyStatusBadge />
      <UserButton />
    </>
  );

  return (
    <CompanyLayoutClient statusBadge={statusBadge}>
      {children}
    </CompanyLayoutClient>
  );
}
