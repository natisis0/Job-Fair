import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "The Job Fair Company",
  description: "Connect. Network. Succeed.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins bg-[#F8F8FB] text-slate-900 antialiased flex flex-col selection:bg-cyan-500 selection:text-white`}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "12px",
              padding: "14px 20px",
              fontSize: "14px",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
