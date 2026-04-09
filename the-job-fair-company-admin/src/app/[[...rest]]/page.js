import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center p-4">
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 p-10 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="space-y-4 text-center">
            <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Access Restricted</h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              We found your account, but it doesn&apos;t have an assigned role yet. 
            </p>
            <div className="pt-6 border-t border-slate-200/50 flex flex-col items-center gap-4">
              <p className="text-sm text-slate-400">Not your account?</p>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="flex w-full max-w-md items-center justify-center">
        <SignIn
          withSignUp={false}
          forceRedirectUrl="/" // Redirect to home so middleware handles the dash redirect
          signUpUrl={undefined}
          appearance={{
            variables: {
              colorPrimary: "#06b6d4",
              fontFamily: "var(--font-poppins)",
              borderRadius: "1.5rem",
            },
            elements: {
              footer: "hidden",
              card: "shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 bg-white/60 backdrop-blur-xl",
              formButtonPrimary: "bg-linear-to-r from-indigo-500 to-cyan-500 hover:scale-[1.02] transition-all text-sm font-bold shadow-lg shadow-indigo-500/20 px-6 py-3",
              headerTitle: "text-slate-800 font-black tracking-tight",
              headerSubtitle: "text-slate-500 font-medium",
              socialButtonsBlockButton: "border-white/40 bg-white/40 hover:bg-white/60 transition-all rounded-2xl",
              formFieldLabel: "text-slate-700 font-semibold",
              formFieldInput: "border-white/40 bg-white/40 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all",
            },
          }}
        />
      </div>
    </main>
  );
}
