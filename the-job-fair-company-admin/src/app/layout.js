import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from '@clerk/nextjs'

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "The Job Fair Company Admin",
    template: "%s | Job Fair Admin",
  },
  description: "Manage events and companies for The Job Fair Company.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins relative antialiased flex min-h-screen flex-col selection:bg-indigo-500 selection:text-white bg-slate-50 text-slate-900`}
      >
        {/* Modern Background with Glow Blobs */}
        <div className="fixed inset-0 z-[-1] min-h-screen w-full bg-slate-50 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-indigo-300/20 to-cyan-300/20 blur-[100px]" />
          <div className="absolute top-[20%] right-[-5%] h-[700px] w-[700px] rounded-full bg-gradient-to-bl from-violet-300/20 to-fuchsia-300/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[10%] h-[800px] w-[800px] rounded-full bg-gradient-to-tr from-emerald-300/15 to-teal-300/15 blur-[120px]" />
        </div>
        
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "16px",
              padding: "16px 24px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.4)",
              backdropFilter: "blur(12px)",
            },
          }}
        />
       <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
