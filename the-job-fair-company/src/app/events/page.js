import EventsPage from '@/features/eventsPage'
import Footer from '@/features/footer'
import Header from '@/features/header'
import { Suspense } from "react";

export default async function page({ searchParams }) {
  const params = await searchParams;
  const filter = params.filter || "weekdays";

  return (
    <div>
      <Header />
      <Suspense fallback={<div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center text-gray-500 font-medium">Loading events...</div>}>
        <EventsPage filter={filter} />
      </Suspense>
      <Footer />
    </div>
  );
}
