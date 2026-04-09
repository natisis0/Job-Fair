import Image from "next/image";
import Link from "next/link";
import authIllustration from "@/features/authentication/assets/image.png";
import RegisterForm from "./components/form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-8">
      {/* Main Container Card */}
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.08)] overflow-hidden min-h-150">
        {/* Left side illustration and text */}
        <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 bg-blue-50/30 relative">
          <div className="w-full max-w-sm text-center flex flex-col items-center">
            <Image
              src={authIllustration}
              alt="Secure Registration"
              className="w-full max-w-70 object-contain mb-8 drop-shadow-md"
            />
            <h1 className="text-3xl font-bold mb-4 text-gray-900 leading-tight">
              Register Individual
              <br />
              Account!
            </h1>
            <p className="text-gray-600 mb-6">Lorem ipsum dolor.</p>
            <p className="text-gray-600 border-t pt-6 border-gray-200 w-full">
              Already have an Account?{" "}
              <Link
                href="/login"
                className="text-[#3bc3c1] font-medium hover:underline"
              >
                Click Here to Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right side form area */}
        <div className="flex-1 flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
