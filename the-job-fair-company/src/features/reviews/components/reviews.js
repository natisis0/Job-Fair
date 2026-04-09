import ReviewCard from "./ReviewCard";
import AddReviewCard from "./AddReviewCard";
import { FiArrowDown } from "react-icons/fi";

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Developer",
    review:
      "As a recruiter, this platform streamlined our entire hiring process. We could instantly access candidate profiles and schedule follow-ups.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "HR Director, TechCorp",
    review:
      "The interface is intuitive and the event organization was flawless. Will definitely participate in future events.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Software Developer",
    review:
      "As a recruiter, this platform streamlined our entire hiring process. We could instantly access candidate profiles and schedule follow-ups.",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Software Developer",
    review:
      "As a recruiter, this platform streamlined our entire hiring process. We could instantly access candidate profiles and schedule follow-ups.",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    role: "Software Developer",
    review:
      "As a recruiter, this platform streamlined our entire hiring process. We could instantly access candidate profiles and schedule follow-ups.",
  },
];

export default function Reviews() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full mb-16">
        {REVIEWS.map((review) => (
          <ReviewCard
            key={review.id}
            name={review.name}
            role={review.role}
            review={review.review}
          />
        ))}
        {/* Add Review Card */}
        <AddReviewCard />
      </div>

      {/* Show More Button */}
      <button className="flex items-center gap-2 border border-[#36B3BA] text-[#36B3BA] rounded-full px-8 py-2.5 text-sm font-semibold hover:bg-cyan-50 transition-colors">
        Show More <FiArrowDown className="w-4 h-4" />
      </button>
    </>
  );
}
